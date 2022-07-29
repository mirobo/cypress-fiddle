it('download test with firefox', { browser: 'firefox' }, () => {
  cy.visit('/test-pages/download-page.html');
  cy.contains('download').click();
});
