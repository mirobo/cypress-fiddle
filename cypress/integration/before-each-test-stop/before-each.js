describe('suite overall', { baseUrl: null }, () => {
  describe('suite A', () => {
    beforeEach('before suite 1', () => {
      cy.log('hey');
      cy.visit('cypress/fixtures/page-with-2-buttons.html');
    });

    it('test 1', () => {
      cy.log('let it fail');
    });
  });

  describe('suite B', () => {
    beforeEach('before suite B', () => {
      cy.log('this beforeEach doesnt fail, but IMO should be executed');
    });

    it('test 3', () => {
      cy.log('test 3');
    });
    it('test 3', () => {
      cy.log('test 3');
    });
  });
});

// var x = true;
Cypress.on('command:end', (command) => {
  // spy.resetHistory();
  //   if (!ignoreError) {
  console.log(command.attributes.name, command.attributes.args);

  if (command.attributes?.args?.length > 0 && command.attributes?.args[0] == 'let it fail') {
    // x = !x;
    // console.log('error!!');
    throw new Error(`console error occurred`);
  } else {
    // console.log('no error');
  }
  //   }
});
