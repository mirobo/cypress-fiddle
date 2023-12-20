it('log env', () => {
  cy.log(Cypress.env());
  console.log(Cypress.env());
});
