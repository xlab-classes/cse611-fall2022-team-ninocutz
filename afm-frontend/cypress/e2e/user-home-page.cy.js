describe("User Page", function () {
  it("Verify Title", function () {
    cy.visit("https://architectformobilehairdesign.com/");
    cy.title().should("eq", "AFM-HD");
  });
  it("Verify Future Events", function () {
    cy.visit("https://architectformobilehairdesign.com/");
    cy.contains("Future Events");
  });
  it("Verify Past Events", function () {
    cy.visit("https://architectformobilehairdesign.com/");
    cy.contains("Past Events");
  });
  it("Verify Gallery", function () {
    cy.visit("https://architectformobilehairdesign.com/");
    cy.contains("Gallery");
  });  
  it("Verify Request RV", function () {
    cy.visit("https://architectformobilehairdesign.com/");
    cy.contains("Request RV");
  });  
  it("Verify Sign Up", function () {
    cy.visit("https://architectformobilehairdesign.com/");
    cy.contains("Sign Up");
  });   
});
