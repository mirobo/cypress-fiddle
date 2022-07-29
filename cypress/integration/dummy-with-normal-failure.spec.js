it('dummy with normal failure', () => {
  cy.get('this-will-fail', { timeout: 100 });
});
