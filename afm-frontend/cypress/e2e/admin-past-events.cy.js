describe("Admin Past Events", () => {
  it("Past events page admin is able to enter the details for past events, validate fields, validate posting and delete", () => {
    // Login
    cy.visit(Cypress.env("baseUrl") + "login");
    cy.get("[id=email]").type(Cypress.env("loginEmail"));
    cy.get("[id=password]").type(Cypress.env("passowrd"));
    cy.get("[id=loginButton]").click();

    // Validate redirection
    cy.get("[id=pastEvents]").click();
    cy.get("[id=addPastEvent]").click();
    cy.location("pathname").should("eq", "/admin/add-past-event");

    cy.contains("Past Events");

    cy.get("[id=submit]").should("be.disabled");

    // Input all Data
    cy.get('input[type="file"]').attachFile("terminal.jpg");
    cy.get("[id=remove]").click();
    cy.get('input[type="file"]').attachFile("terminal.jpg");
    cy.get("[id=eventName]").type("Automated Test Event");
    cy.get("[id=fromTime]").type("10:00");
    cy.get("[id=toTime]").type("12:00");
    cy.get("[id=message]").type("Automated Test Message Input");
    cy.get("[id=eventType]").click();
    cy.contains("Wedding").click();
    cy.get("[id=eventDate]").type("12/02/2021");
    cy.get("[id=zipCode]").type("14214");
    cy.get("[id=address]").type("Automated Test Message Address");

    cy.get("[id=submit]").should("not.be.disabled");

    // Remove data one by one and check if submit button is disabled
    cy.get("[id=eventName]")
      .type("{selectAll}")
      .type("{backspace}")
      .should("have.value", "");
    cy.get("[id=submit]").should("be.disabled");
    cy.get("[id=eventName]").type("Automated Test Event");
    cy.get("[id=submit]").should("not.be.disabled");

    cy.get("[id=fromTime]")
      .type("{selectAll}")
      .type("{backspace}")
      .should("have.value", "");
    cy.get("[id=submit]").should("be.disabled");
    cy.get("[id=fromTime]").type("10:00");
    cy.get("[id=submit]").should("not.be.disabled");

    cy.get("[id=toTime]")
      .type("{selectAll}")
      .type("{backspace}")
      .should("have.value", "");
    cy.get("[id=submit]").should("be.disabled");
    cy.get("[id=toTime]").type("12:00");
    cy.get("[id=submit]").should("not.be.disabled");

    cy.get("[id=message]")
      .type("{selectAll}")
      .type("{backspace}")
      .should("have.value", "");
    cy.get("[id=submit]").should("be.disabled");
    cy.get("[id=message]").type("Automated Test Message Input");
    cy.get("[id=submit]").should("not.be.disabled");

    cy.get("[id=eventDate]")
      .type("{selectAll}")
      .type("{backspace}")
      .should("have.value", "");
    cy.get("[id=submit]").should("be.disabled");

    cy.get("[id=eventDate]").type("12/02/2021");
    cy.get("[id=submit]").should("not.be.disabled");

    cy.get("[id=zipCode]").type("{selectAll}").type("{backspace}").blur();
    cy.get("[id=submit]").should("be.disabled");
    cy.get("[id=zipCode]").type("14214").blur();
    cy.get("[id=submit]").should("not.be.disabled");

    cy.get("[id=address]")
      .type("{selectAll}")
      .type("{backspace}")
      .should("have.value", "");
    cy.get("[id=submit]").should("be.disabled");
    cy.get("[id=address]").type("Automated Test Message Address");
    cy.get("[id=submit]").should("not.be.disabled");

    // Validate Zip Code values
    cy.get("[id=zipCode]").type("{backspace}").blur();
    cy.get("[id=submit]").should("be.disabled");

    cy.get("[id=zipCode]").type("4").blur();
    cy.get("[id=submit]").should("not.be.disabled");

    // Submit the Event
    cy.intercept("POST", "/event").as("createPastEvent");
    cy.get("[id=submit]").click();
    cy.wait("@createPastEvent").its("response.statusCode").should("eq", 201);

    cy.location("pathname").should("eq", "/admin/past-events");

    // Check if the event is displayed for the customer
    cy.visit(Cypress.env("baseUrl"));
    cy.get("[id=past-event-0]").first().click({ force: true });

    // Delete the event from the DB, Validating delete past event
    cy.visit(Cypress.env("baseUrl") + "admin/past-events");

    cy.get("[id=editPastEvent-0]").click();
    cy.location("pathname").should("eq", "/admin/edit-past-event");
    cy.get("[id=delete]").click();

    cy.location("pathname").should("eq", "/admin/past-events");

    // Validate if past event is not displayed to user
    cy.visit(Cypress.env("baseUrl"));
    cy.get("[id=past-event-0]").should("not.exist");
  });
});
