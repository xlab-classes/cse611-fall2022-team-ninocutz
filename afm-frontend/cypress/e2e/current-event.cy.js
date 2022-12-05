describe("Admin Current Event", () => {
  it("Home Page, admin clicks on Share Current Location redirects to page to fill current event details, and able to enter the required details", () => {
    cy.visit("http://localhost:4200/login");
    cy.get("[id=email]").type("automation@test.com");
    cy.get("[id=password]").type("defaultPassword");

    cy.get("[id=loginButton]").click();

    cy.location("pathname").should("eq", "/admin/home");

    cy.get("[id=shareCurrentLocation]").click();
    cy.location("pathname").should("eq", "/admin/current-event");

    cy.get("[id=eventName]").type("Automated Test Event");
    cy.get("[id=fromTime]").type("10:00");
    cy.get("[id=toTime]").type("12:00");

    cy.get("[id=message]").type("Automated Test Message Input");
    cy.get("[id=eventType]").click();
    cy.contains("Wedding").click();

    cy.get("[id=shareLocation]").should("be.disabled");

    cy.get("[id=getLocation]").click();

    cy.wait(5000);

    cy.get("[id=updateLocation]").click();

    cy.get("[id=shareLocation]").should("not.be.disabled");

    cy.get("[id=triggerEmail]").find("input").click({ force: true });

    cy.get("[id=triggerSms]").find("input").click({ force: true });
  });

  it("Validate Share button on invalid data", () => {
    cy.visit("http://localhost:4200/login");
    cy.get("[id=email]").type("automation@test.com");
    cy.get("[id=password]").type("defaultPassword");

    cy.get("[id=loginButton]").click();

    cy.location("pathname").should("eq", "/admin/home");

    cy.get("[id=shareCurrentLocation]").click();

    cy.get("[id=eventName]").type("Automated Test Event");
    cy.get("[id=fromTime]").type("10:00");
    cy.get("[id=toTime]").type("12:00");

    cy.get("[id=message]").type("Automated Test Message Input");
    cy.get("[id=eventType]").click();
    cy.contains("Wedding").click();

    cy.get("[id=shareLocation]").should("be.disabled");

    cy.get("[id=getLocation]").click();

    cy.wait(5000);

    cy.get("[id=updateLocation]").click();

    cy.get("[id=shareLocation]").should("not.be.disabled");

    cy.get("[id=triggerEmail]").find("input").click({ force: true });

    cy.get("[id=triggerSms]").find("input").click({ force: true });

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
    cy.get("[id=fromTime]").type("10:00");
    cy.get("[id=shareLocation]").should("not.be.disabled");

    cy.get("[id=toTime]")
      .type("{selectAll}")
      .type("{backspace}")
      .should("have.value", "");
    cy.get("[id=shareLocation]").should("be.disabled");
    cy.get("[id=toTime]").type("12:00");
    cy.get("[id=shareLocation]").should("not.be.disabled");

    cy.get("[id=message]")
      .type("{selectAll}")
      .type("{backspace}")
      .should("have.value", "");
    cy.get("[id=shareLocation]").should("be.disabled");
    cy.get("[id=message]").type("Automated Test Message Input");
    cy.get("[id=shareLocation]").should("not.be.disabled");
  });
});
