describe("User Page", () => {
  it("Verify Title", () => {
    cy.visit(Cypress.env("baseUrl"));
    cy.title().should("eq", "AFM-HD");
  });

  it("Verify Future Events", () => {
    cy.visit(Cypress.env("baseUrl"));
    cy.contains("Future Events");
  });

  it("Verify Past Events", () => {
    cy.visit(Cypress.env("baseUrl"));
    cy.contains("Past Events");
  });

  it("Verify Gallery", () => {
    cy.visit(Cypress.env("baseUrl"));
    cy.contains("Gallery");
  });

  it("Verify Request RV", () => {
    cy.visit(Cypress.env("baseUrl"));
    cy.contains("Request RV");
  });

  it("Verify Sign Up", () => {
    cy.visit(Cypress.env("baseUrl"));
    cy.contains("Sign Up");
  });
});
