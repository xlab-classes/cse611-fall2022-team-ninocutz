describe("Request and Verify for RV", function () {
  it("Request RV", function () {
    cy.intercept("POST", "/bookings").as("createBooking");
    cy.visit("http://localhost:4200/");
    cy.contains("Request RV").click();
    cy.get("[id=firstName]").type("John");
    cy.get("[id=lastName]").type("Doe");
    cy.get("[id=emailAddress]").type("test@test.com");
    cy.get("[id=address]").type("196 Englewood Ave");
    cy.get("[id=numberOfPeople]").type("10");
    cy.get("[id=bookingDate]").type("12/12/2022");
    cy.get("[id=fromTime]").type("10:00");
    cy.get("[id=toTime]").type("11:00");
    cy.get("[id=zipCode]").type("14214");
    cy.get("[id=mobileNumber]").type("7164168888");
    cy.get(".form-internal-box").click();
    cy.wait(2000);
    cy.get("[id=submit]").click();
    cy.wait("@createBooking").its("response.statusCode").should("eq", 201);
  });

  it("Verify Submit is disabled", function () {
    cy.visit("http://localhost:4200/");
    cy.contains("Sign Up").click();
    cy.get("[id=submit]").should("be.disabled");
  });
});
