describe("Admin Past Events", () => {
  it("Home Page, admin clicks on Past Events redirects to page to display all past events", () => {
    cy.visit("http://localhost:4200/login");
    cy.get("[id=email]").type("bhavan.reddy1997@gmail.com");
    cy.get("[id=password]").type("password");

    cy.get("[id=loginButton]").click();
    cy.location("pathname").should("eq", "/admin/home");

    cy.get("[id=pastEvents]").click();
    cy.location("pathname").should("eq", "/admin/past-events");

    cy.contains("Past Events");
  });

  it("Past events page admin is able to enter the details for past events, validate fields", () => {
    cy.visit("http://localhost:4200/login");
    cy.get("[id=email]").type("bhavan.reddy1997@gmail.com");
    cy.get("[id=password]").type("password");

    cy.get("[id=loginButton]").click();

    cy.get("[id=pastEvents]").click();
    cy.get("[id=addPastEvent]").click();
    cy.location("pathname").should("eq", "/admin/add-past-event");

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
  });
});
