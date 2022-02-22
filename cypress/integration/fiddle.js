/// <reference types="@cypress/fiddle" />

let cell;

//

describe('retry test', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.contains('#evilRow td', 'c');
    // click the button which exchanges the row "evilRow" in the table
    cy.get('#exchangeRow').click();
  });

  it('verifyText2 will fail', () => {
    // will fail.. the last command doesn't contain the element which is exchanged in the DOM
    cy.get('#evilRow').find('td').verifyText2('new text');
  });

  describe('getCellWithFind', () => {
    const getCellWithFind = () => cy.get('table').find('#evilRow td'); // this works, as the last command is retried and it contains the element that is replaced in the DOM

    it('verifyText2 should retry', () => {
      getCellWithFind().verifyText2('new text');
    });

    it('verifyText2 should fail because of timeout', () => {
      Cypress.on('fail', (error, runnable) => {
        expect(error.name).to.eq('AssertionError');
        expect(error.message).to.match(
          /Timed out retrying after 4000ms: expected '<td>' to have text 'new text4', but the TRIMMED text was 'new text'. Actual text escaped: 'new%20text'/
        );
      });
      getCellWithFind().verifyText2('new text4');
    });
  });

  describe('getCellWithSingleGet', () => {
    const getCellWithSingleGet = () => cy.get('#evilRow td'); // will pass

    it('verifyText2 should retry', () => {
      getCellWithSingleGet().verifyText2('new text');
    });

    it('verifyText2 should fail because of timeout', () => {
      Cypress.on('fail', (error, runnable) => {
        expect(error.name).to.eq('AssertionError');
        expect(error.message).to.match(
          /Timed out retrying after 4000ms: expected '<td>' to have text 'new text4', but the TRIMMED text was 'new text'. Actual text escaped: 'new%20text'/
        );
      });
      getCellWithSingleGet().verifyText2('new text4');
    });
  });
});
