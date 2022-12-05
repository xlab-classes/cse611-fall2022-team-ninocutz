describe("Logout", () => {
  it("Verify if admin is able to log out successfully", () => {
    // Login
    cy.visit(Cypress.env("baseUrl") + "login");
    cy.get("[id=email]").type(Cypress.env("loginEmail"));
    cy.get("[id=password]").type(Cypress.env("passowrd"));
    cy.get("[id=loginButton]").click();
    cy.location("pathname").should("eq", "/admin/home");

    //Validate logout
    cy.get("[id=logout]").click();
    cy.location("pathname").should("eq", "/login");

    // Check if user is not able to access the urls
    cy.visit(Cypress.env("baseUrl") + "admin/home");
    cy.location("pathname").should("eq", "/login");
  });
});
