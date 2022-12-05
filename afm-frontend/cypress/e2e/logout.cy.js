describe("Logout", () => {
  it("Verify if admin is able to log out successfully", () => {
    cy.visit("http://localhost:4200/login");
    cy.get("[id=email]").type("automation@test.com");
    cy.get("[id=password]").type("defaultPassword");
    cy.get("[id=loginButton]").click();
    cy.location("pathname").should("eq", "/admin/home");

    cy.get("[id=logout]").click();
    cy.location("pathname").should("eq", "/login");

    cy.visit("http://localhost:4200//admin/home");
    cy.location("pathname").should("eq", "/login");
  });
});
