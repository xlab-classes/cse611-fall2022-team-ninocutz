describe("Login Page", () => {
  it("User logs in with valid credentials", () => {
    // Login
    cy.visit(Cypress.env("baseUrl") + "login");
    cy.get("[id=email]").type(Cypress.env("loginEmail"));
    cy.get("[id=password]").type(Cypress.env("passowrd"));

    cy.intercept("POST", "/auth").as("login");
    cy.get("[id=loginButton]").click();
    cy.wait("@login").its("response.statusCode").should("eq", 200);

    cy.location("pathname").should("eq", "/admin/home");
  });

  it("User logs in with invalid credentials", () => {
    // Login
    cy.visit(Cypress.env("baseUrl") + "login");
    cy.get("[id=email]").type(Cypress.env("loginEmail"));
    cy.get("[id=password]").type("invalidPassword");

    cy.intercept("POST", "/auth").as("login");
    cy.get("[id=loginButton]").click();
    cy.wait("@login").its("response.statusCode").should("eq", 401);

    cy.location("pathname").should("eq", "/login");
    cy.contains("Error");
  });

  it("User clicks on forgot password redirects to forgot password page", () => {
    cy.visit(Cypress.env("baseUrl") + "login");
    cy.get("[id=forgot-password]").click();

    cy.location("pathname").should("eq", "/forgot-password");
  });
});
