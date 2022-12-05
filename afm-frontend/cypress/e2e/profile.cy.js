describe("User Profile", () => {
  it("User Able to update the profile details", () => {
    cy.visit("http://localhost:4200/login");
    cy.get("[id=email]").type("automation@test.com");
    cy.get("[id=password]").type("defaultPassword");
    cy.get("[id=loginButton]").click();

    cy.get("[id=profile]").click();
    cy.location("pathname").should("eq", "/admin/profile");

    // Validate Existing Data
    cy.get("[id=firstName]").should("have.value", "Automation");
    cy.get("[id=lastName]").should("have.value", "Test");
    cy.get("[id=emailId]").should("have.value", "automation@test.com");
    cy.get("[id=mobileNumber]").should("have.value", "7165555555");
    cy.get("[id=address]").should("have.value", "Englewood");
    cy.get("[id=zipCode]").should("have.value", "14214");

    // Update A field and save
    cy.get("[id=address]").type(" Update");

    cy.intercept("PUT", "/user").as("updateProfile");
    cy.get("[id=update]").click();
    cy.wait("@updateProfile").its("response.statusCode").should("eq", 204);

    cy.contains("Success");

    cy.get("[id=address]").should("have.value", "Englewood Update");

    // Update Back the field
    cy.intercept("PUT", "/user").as("updateProfile");
    cy.get("[id=address]")
      .type("{selectAll}")
      .type("{backspace}")
      .type("Englewood");
    cy.get("[id=update]").click();
    cy.wait("@updateProfile").its("response.statusCode").should("eq", 204);
  });
});
