describe("Gallery", () => {
  it("Validate if User is able to add Gallery image, and it is displayed to customer", () => {
    // Login
    cy.visit(Cypress.env("baseUrl") + "login");
    cy.get("[id=email]").type(Cypress.env("loginEmail"));
    cy.get("[id=password]").type(Cypress.env("passowrd"));
    cy.get("[id=loginButton]").click();

    //Validate adding of image
    cy.get("[id=gallery]").click();
    cy.location("pathname").should("eq", "/admin/gallery");

    cy.get('input[type="file"]').attachFile("terminal.jpg");
    cy.get("[id=remove]").click();
    cy.get('input[type="file"]').attachFile("terminal.jpg");

    cy.intercept("POST", "/images/gallery").as("addGalleryImage");
    cy.get("[id=submit]").click();
    cy.wait("@addGalleryImage").its("response.statusCode").should("eq", 201);

    cy.contains("Success");

    // Validate if user is able to see the gallery image
    cy.visit(Cypress.env("baseUrl"));
    cy.get("[id=galleryImage-0]").should("exist");

    //Validate Delete of gallery image
    cy.visit(Cypress.env("baseUrl") + "admin/gallery");

    cy.intercept("DELETE", "/images/gallery/*").as("deleteGalleryImage");
    cy.get("[id=galleryImageDelete-0]").click();
    cy.wait("@deleteGalleryImage").its("response.statusCode").should("eq", 204);

    cy.contains("Success");
    cy.get("[id=galleryImageDelete-0]").should("not.exist");

    // Validate image is not visible to user
    cy.visit(Cypress.env("baseUrl"));
    cy.get("[id=galleryImage-0]").should("not.exist");
  });
});
