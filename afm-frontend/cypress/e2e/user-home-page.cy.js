describe("User Page", function () {
  it("Verify Title", function () {
    cy.visit("http://localhost:4200/");
    cy.title().should("eq", "AFM-HD");
  });

  it("Verify Future Events", function () {
    cy.visit("http://localhost:4200/");
    cy.contains("Future Events");
  });

  it("Verify Past Events", function () {
    cy.visit("http://localhost:4200/");
    cy.contains("Past Events");
  });

  it("Verify Gallery", function () {
    cy.visit("http://localhost:4200/");
    cy.contains("Gallery");
  });

  it("Verify Request RV", function () {
    cy.visit("http://localhost:4200/");
    cy.contains("Request RV");
  });

  it("Verify Sign Up", function () {
    cy.visit("http://localhost:4200/");
    cy.contains("Sign Up");
  });
});
