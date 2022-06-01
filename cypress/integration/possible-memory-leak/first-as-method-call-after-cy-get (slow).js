describe('performance :first vs first()', () => {
  beforeEach(() => {
    cy.visit('/cypress/fixtures/page-with-2-buttons.html');
  });

  // 100 times -> 6 seconds
  // 200 times -> 19 seconds
  // 300 times -> 41 seconds
  // 400 times -> 72 seconds
  it('test with first() call after cy.get()', () => {
    Cypress._.times(100, () => {
      cy.get('button').first().should('exist');
    });
  });
});
