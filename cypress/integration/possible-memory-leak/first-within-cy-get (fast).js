describe('performance :first vs first()', () => {
  beforeEach(() => {
    cy.visit('/cypress/fixtures/page-with-2-buttons.html');
  });

  // 100 times -> ~ 2.5 seconds
  // 200 times -> ~ 8 seconds
  // 300 times -> ~ 16 seconds
  // 400 times -> ~ 27 seconds
  it('test with :first inside cy.get()', () => {
    Cypress._.times(400, () => {
      cy.get('button:first').should('exist');
    });
  });
});
