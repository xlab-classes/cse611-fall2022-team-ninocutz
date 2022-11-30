describe("User Page", function () {
  xit("Verify Title", function () {
    cy.visit("http://localhost:4200/");
    cy.title().should("eq", "AFM-HD");
  });

  xit("Verify Future Events", function () {
    cy.visit("http://localhost:4200/");
    cy.contains("Future Events");
  });

  xit("Verify Past Events", function () {
    cy.visit("http://localhost:4200/");
    cy.contains("Past Events");
  });

  xit("Verify Gallery", function () {
    cy.visit("http://localhost:4200/");
    cy.contains("Gallery");
  });

  xit("Verify Request RV", function () {
    cy.visit("http://localhost:4200/");
    cy.contains("Request RV");
  });

  xit("Verify Sign Up", function () {
    cy.visit("http://localhost:4200/");
    cy.contains("Sign Up");
  });
});
