describe("Login Page", () => {
  it("User logs in with valid credentials", () => {
    cy.visit("http://localhost:4200/login");
    cy.get("[id=email]").type("bhavan.reddy1997@gmail.com");
    cy.get("[id=password]").type("password");

    cy.intercept("POST", "/auth").as("login");
    cy.get("[id=loginButton]").click();

    cy.wait("@login").its("response.statusCode").should("eq", 200);

    cy.location("pathname").should("eq", "/admin/home");
  });

  it("User logs in with invalid credentials", () => {
    cy.visit("http://localhost:4200/login");
    cy.get("[id=email]").type("bhavan.reddy1997@gmail.com");
    cy.get("[id=password]").type("invalidPassword");

    cy.intercept("POST", "/auth").as("login");
    cy.get("[id=loginButton]").click();

    cy.wait("@login").its("response.statusCode").should("eq", 401);

    cy.location("pathname").should("eq", "/login");
    cy.contains("Error");
  });

  it("User clicks on forgot password redirects to forgot password page", () => {
    cy.visit("http://localhost:4200/login");
    cy.get("[id=forgot-password]").click();

    cy.location("pathname").should("eq", "/forgot-password");
  });
});
