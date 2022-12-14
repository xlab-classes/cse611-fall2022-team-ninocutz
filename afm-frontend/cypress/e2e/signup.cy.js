describe("Sign Up for Notifications", () => {
  it("Verify Submit is disabled", () => {
    cy.visit(Cypress.env("baseUrl"));
    cy.contains("Sign Up").click();
    cy.get("[id=submit]").should("be.disabled");
  });

  it("SignUp", () => {
    cy.visit(Cypress.env("baseUrl"));
    cy.get("[id=signup]").click();

    // Fill in details
    cy.get("[id=firstName]").type("John");
    cy.get("[id=lastName]").type("Doe");
    cy.get("[id=emailAddress]").type("test@test.com");
    cy.get("[id=address]").type("196 Englewood Ave");
    cy.get("[id=zipCode]").type("14214");
    cy.get("[id=mobileNumber]").type("7164168888");
    cy.get(".form-internal-box").click();

    cy.intercept("POST", "/customer").as("signUp");
    cy.get("[id=submit]").click();
    cy.wait("@signUp").its("response.statusCode").should("eq", 201);
  });
});
