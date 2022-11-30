describe("Sign Up for Notifications", function () {
    xit("SignUp", function () {
      cy.intercept('POST', '/customer').as('signUp')    
      cy.visit("https://architectformobilehairdesign.com/");
      cy.contains('Sign Up').click();
      cy.get('[data-id=firstName]').type('John');
      cy.get('[data-id=lastName]').type('Doe');
      cy.get('[data-id=emailAddress]').type('test@test.com');
      cy.get('[data-id=address]').type('196 Englewood Ave');
      cy.get('[id=zipCode]').type('14214');
      cy.get('[id=mobileNumber]').type('7164168888');
      cy.get('.form-internal-box').click();
      cy.get('[id=Submit]').click();
      cy.wait('@signUp').its('response.statusCode').should('eq', 201);
    });
    it("Verify Submit is disabled", function () {
      cy.visit("https://architectformobilehairdesign.com/");
      cy.contains('Sign Up').click();
      cy.get('[id=Submit]').should('be.disabled')
    });    
  });  