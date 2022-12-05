describe("Users", () => {
  it("Validate if users exist", () => {
    cy.visit("http://localhost:4200/login");
    cy.get("[id=email]").type("bhavan.reddy1997@gmail.com");
    cy.get("[id=password]").type("password");
    cy.get("[id=loginButton]").click();

    cy.get("[id=users]").click();
    cy.location("pathname").should("eq", "/admin/users");

    cy.get("[id=search]").type("bhavan.reddy1997@gmail.com");

    cy.contains("bhavan.reddy1997@gmail.com");
  });

  it("Validate adding of user", () => {
    cy.visit("http://localhost:4200/login");
    cy.get("[id=email]").type("bhavan.reddy1997@gmail.com");
    cy.get("[id=password]").type("password");
    cy.get("[id=loginButton]").click();

    cy.get("[id=users]").click();
    cy.location("pathname").should("eq", "/admin/users");

    cy.get("[id=addUser]").click();

    cy.get("[id=firstName]").type("Test");
    cy.get("[id=lastName]").type("User");
    cy.get("[id=emailId]").type("test@test.com");
    cy.get("[id=mobileNumber]").type("7165555555");
    cy.get("[id=address]").type("Englewood");
    cy.get("[id=zipCode]").type("14214");

    cy.intercept("POST", "/user").as("addUser");

    cy.get("[id=addButton]").click();
    cy.wait("@addUser").its("response.statusCode").should("eq", 200);

    cy.get("[id=search]").type("test@test.com");
    cy.contains("7165555555");
  });
});
