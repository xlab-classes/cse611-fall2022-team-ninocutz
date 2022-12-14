describe("Users", () => {
  it("Validate if users exist", () => {
    // Login
    cy.visit(Cypress.env("baseUrl") + "login");
    cy.get("[id=email]").type(Cypress.env("loginEmail"));
    cy.get("[id=password]").type(Cypress.env("passowrd"));
    cy.get("[id=loginButton]").click();

    // Validate refirection and if user exists
    cy.get("[id=users]").click();
    cy.location("pathname").should("eq", "/admin/users");

    cy.get("[id=search]").type(Cypress.env("loginEmail"));

    cy.contains(Cypress.env("loginEmail"));
  });

  it("Validate adding of user", () => {
    // Login
    cy.visit(Cypress.env("baseUrl") + "login");
    cy.get("[id=email]").type(Cypress.env("loginEmail"));
    cy.get("[id=password]").type(Cypress.env("passowrd"));
    cy.get("[id=loginButton]").click();

    cy.get("[id=users]").click();
    cy.location("pathname").should("eq", "/admin/users");

    // Validate Add user
    cy.get("[id=addUser]").click();

    // Fill in details
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

    // Validate delete user

    cy.get("[id=deleteUser-Test]").click({ multiple: true });
    cy.contains("7165555555").should("not.exist");
  });
});
