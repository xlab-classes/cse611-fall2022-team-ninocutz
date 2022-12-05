describe("Admin Current Event", () => {
  it("Home Page, admin clicks on Share Current Location redirects to page to fill current event details, and able to enter the required details", () => {
    // Login
    cy.visit(Cypress.env("baseUrl") + "login");
    cy.get("[id=email]").type(Cypress.env("loginEmail"));
    cy.get("[id=password]").type(Cypress.env("passowrd"));
    cy.get("[id=loginButton]").click();

    cy.location("pathname").should("eq", "/admin/home");

    // Redirect to Current Events page
    cy.get("[id=shareCurrentLocation]").click();
    cy.location("pathname").should("eq", "/admin/current-event");

    // Validate input details
    cy.get("[id=eventName]").type("Automated Test Event");
    cy.get("[id=fromTime]").type("10:00");
    cy.get("[id=toTime]").type("12:00");

    cy.get("[id=message]").type("Automated Test Message Input");
    cy.get("[id=eventType]").click();
    cy.contains("Wedding").click();

    cy.get("[id=shareLocation]").should("be.disabled");

    cy.get("[id=getLocation]").click();

    // added wait, google maps takes time to fetch the location
    cy.wait(5000);

    cy.get("[id=updateLocation]").click();
    cy.get("[id=shareLocation]").should("not.be.disabled");

    cy.get("[id=triggerEmail]").find("input").click({ force: true });
    cy.get("[id=triggerSms]").find("input").click({ force: true });
  });

  it("Validate Share button on invalid data", () => {
    // Login
    cy.visit(Cypress.env("baseUrl") + "login");
    cy.get("[id=email]").type(Cypress.env("loginEmail"));
    cy.get("[id=password]").type(Cypress.env("passowrd"));
    cy.get("[id=loginButton]").click();
    cy.location("pathname").should("eq", "/admin/home");

    // Redirect to Current Events page
    cy.get("[id=shareCurrentLocation]").click();

    // Fill in details
    cy.get("[id=eventName]").type("Automated Test Event");
    cy.get("[id=fromTime]").type("10:00");
    cy.get("[id=toTime]").type("12:00");

    cy.get("[id=message]").type("Automated Test Message Input");
    cy.get("[id=eventType]").click();
    cy.contains("Wedding").click();

    cy.get("[id=shareLocation]").should("be.disabled");
    cy.get("[id=getLocation]").click();

    cy.wait(3000);

    cy.get("[id=updateLocation]").click();

    cy.get("[id=shareLocation]").should("not.be.disabled");

    cy.get("[id=eventName]")
      .type("{selectAll}")
      .type("{backspace}")
      .should("have.value", "");
    cy.get("[id=shareLocation]").should("be.disabled");
    cy.get("[id=eventName]").type("Automated Test Event");
    cy.get("[id=shareLocation]").should("not.be.disabled");

    cy.get("[id=fromTime]")
      .type("{selectAll}")
      .type("{backspace}")
      .should("have.value", "");
    cy.get("[id=shareLocation]").should("be.disabled");
    cy.get("[id=fromTime]").type("00:00");
    cy.get("[id=shareLocation]").should("not.be.disabled");

    cy.get("[id=toTime]")
      .type("{selectAll}")
      .type("{backspace}")
      .should("have.value", "");
    cy.get("[id=shareLocation]").should("be.disabled");
    cy.get("[id=toTime]").type("23:59");
    cy.get("[id=shareLocation]").should("not.be.disabled");

    cy.get("[id=message]")
      .type("{selectAll}")
      .type("{backspace}")
      .should("have.value", "");
    cy.get("[id=shareLocation]").should("be.disabled");
    cy.get("[id=message]").type("Automated Test Message Input");
    cy.get("[id=shareLocation]").should("not.be.disabled");

    // Submit the Event
    cy.intercept("POST", "/event/current").as("createCurrentEvent");
    cy.get("[id=shareLocation]").click();
    cy.wait("@createCurrentEvent").its("response.statusCode").should("eq", 201);

    // Check if the event is displayed for the customer
    cy.visit(Cypress.env("baseUrl"));
    cy.get("[id=googleMap]").should("exist");
  });
});
