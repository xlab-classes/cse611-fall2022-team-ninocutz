describe("User Page", () => {
  it("Verify Title", () => {
    cy.visit("http://localhost:4200/");
    cy.title().should("eq", "AFM-HD");
  });

  it("Verify Future Events", () => {
    cy.visit("http://localhost:4200/");
    cy.contains("Future Events");
  });

  it("Verify Past Events", () => {
    cy.visit("http://localhost:4200/");
    cy.contains("Past Events");
  });

  it("Verify Gallery", () => {
    cy.visit("http://localhost:4200/");
    cy.contains("Gallery");
  });

  it("Verify Request RV", () => {
    cy.visit("http://localhost:4200/");
    cy.contains("Request RV");
  });

  it("Verify Sign Up", () => {
    cy.visit("http://localhost:4200/");
    cy.contains("Sign Up");
  });
});
