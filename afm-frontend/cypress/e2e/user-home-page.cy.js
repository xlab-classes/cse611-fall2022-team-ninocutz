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
  
  it("Verify Future Event Booking", function () {
    cy.visit("http://localhost:4200/");
    cy.get("[id=future-event-0]").first().click({ force: true });
    cy.contains("Book Appointment").should('not.be.disabled')
  });

  it("Verify Past Events", function () {
    cy.visit("http://localhost:4200/");
    cy.wait(1000)
    cy.get("[class=image-item]").last().click({ force: true });
    cy.contains('Zipcode')
  });
});
