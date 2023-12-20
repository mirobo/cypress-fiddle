const { secondsInMinute } = require('date-fns');

describe('test suite', () => {
  it('test', () => {
    section(() => {
      cy.log('1');
      cy.log('1');
    });

    section(() => {
      cy.log('1');
      cy.log('1');
    });
  });
});

function section(fn) {
  cy.log('---------------- start ----------------');
  cy.log(typeof fn);
  cy.log(fn);

  fn();

  cy.log('---------------- done ----------------');
}
