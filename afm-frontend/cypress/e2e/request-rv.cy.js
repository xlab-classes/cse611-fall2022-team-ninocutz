describe("Request and Verify for RV", () => {
  it("Verify Submit is disabled", () => {
    cy.visit(Cypress.env("baseUrl"));
    cy.get("[id=requestRv]").click();
    cy.get("[id=submit]").should("be.disabled");
  });

  it("Request RV", () => {
    cy.visit(Cypress.env("baseUrl"));
    cy.get("[id=requestRv]").click();

    // Fill in details
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

    cy.intercept("POST", "/bookings").as("createBooking");
    cy.get("[id=submit]").click();
    cy.wait("@createBooking").its("response.statusCode").should("eq", 201);

    // Validate if the Booking is displayed to the Admin
    cy.visit(Cypress.env("baseUrl") + "login");
    cy.get("[id=email]").type(Cypress.env("loginEmail"));
    cy.get("[id=password]").type(Cypress.env("passowrd"));
    cy.get("[id=loginButton]").click();

    cy.get("[id=requests]").click();
    cy.location("pathname").should("eq", "/admin/requests");

    cy.get("[id=search").type("John");
    cy.contains("John");
    cy.contains("Doe");
    cy.contains("test@test.com");
    cy.contains("196 Englewood Ave");
    cy.contains("7164168888");
  });
});
