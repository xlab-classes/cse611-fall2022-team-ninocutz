describe("Logout", () => {
  it("Verify if admin is able to log out successfully", () => {
    // Login
    cy.visit("http://localhost:4200/login");
    cy.get("[id=email]").type("automation@test.com");
    cy.get("[id=password]").type("defaultPassword");
    cy.get("[id=loginButton]").click();
    cy.location("pathname").should("eq", "/admin/home");

    //Validate logout
    cy.get("[id=logout]").click();
    cy.location("pathname").should("eq", "/login");

    // Check if user is not able to access the urls
    cy.visit("http://localhost:4200//admin/home");
    cy.location("pathname").should("eq", "/login");
  });
});
