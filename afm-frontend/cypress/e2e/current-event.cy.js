describe("Admin Current Event", () => {
  it("Home Page, admin clicks on Share Current Location redirects to page to fill current event details, and able to enter the required details", () => {
    cy.visit("http://localhost:4200/login");
    cy.get("[id=email]").type("bhavan.reddy1997@gmail.com");
    cy.get("[id=password]").type("password");

    cy.get("[id=login-button]").click();

    cy.location("pathname").should("eq", "/admin/home");

    cy.get("[id=share-current-location]").click();

    cy.location("pathname").should("eq", "/admin/current-event");

    cy.get("[id=event-name]").type("Automated Test Event");
    cy.get("[id=fromTime]").type("10:00");
    cy.get("[id=toTime]").type("12:00");

    cy.get("[id=message]").type("Automated Test Message Input");
    cy.get("[id=event-type]").click();
    cy.contains("Wedding").click();

    cy.get("[id=share-location]").should("be.disabled");

    cy.get("[id=get-location]").click();

    cy.wait(5000);

    cy.get("[id=update-location]").click();

    cy.get("[id=share-location]").should("not.be.disabled");

    cy.get("[id=trigger-email]").find("input").click({ force: true });

    cy.get("[id=trigger-sms]").find("input").click({ force: true });
  });

  it("Validate Share button on invalid data", () => {
    cy.visit("http://localhost:4200/login");
    cy.get("[id=email]").type("bhavan.reddy1997@gmail.com");
    cy.get("[id=password]").type("password");

    cy.get("[id=login-button]").click();

    cy.location("pathname").should("eq", "/admin/home");

    cy.get("[id=share-current-location]").click();

    cy.get("[id=event-name]").type("Automated Test Event");
    cy.get("[id=fromTime]").type("10:00");
    cy.get("[id=toTime]").type("12:00");

    cy.get("[id=message]").type("Automated Test Message Input");
    cy.get("[id=event-type]").click();
    cy.contains("Wedding").click();

    cy.get("[id=share-location]").should("be.disabled");

    cy.get("[id=get-location]").click();

    cy.wait(5000);

    cy.get("[id=update-location]").click();

    cy.get("[id=share-location]").should("not.be.disabled");

    cy.get("[id=trigger-email]").find("input").click({ force: true });

    cy.get("[id=trigger-sms]").find("input").click({ force: true });

    cy.get("[id=event-name]")
      .type("{selectAll}")
      .type("{backspace}")
      .should("have.value", "");
    cy.get("[id=share-location]").should("be.disabled");
    cy.get("[id=event-name]").type("Automated Test Event");
    cy.get("[id=share-location]").should("not.be.disabled");

    cy.get("[id=fromTime]")
      .type("{selectAll}")
      .type("{backspace}")
      .should("have.value", "");
    cy.get("[id=share-location]").should("be.disabled");
    cy.get("[id=fromTime]").type("10:00");
    cy.get("[id=share-location]").should("not.be.disabled");

    cy.get("[id=toTime]")
      .type("{selectAll}")
      .type("{backspace}")
      .should("have.value", "");
    cy.get("[id=share-location]").should("be.disabled");
    cy.get("[id=toTime]").type("12:00");
    cy.get("[id=share-location]").should("not.be.disabled");

    cy.get("[id=message]")
      .type("{selectAll}")
      .type("{backspace}")
      .should("have.value", "");
    cy.get("[id=share-location]").should("be.disabled");
    cy.get("[id=message]").type("Automated Test Message Input");
    cy.get("[id=share-location]").should("not.be.disabled");
  });
});
