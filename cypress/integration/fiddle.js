/// <reference types="@cypress/fiddle" />
import { addDays } from 'date-fns';

let cell;

xdescribe('cy.clock test', () => {
  beforeEach(() => {
    cy.clock(new Date('2022-03-25'), ['Date']);
    cy.visit('/');
  });

  it('clock test', () => {
    cy.log(addDays(new Date(), 1).toLocaleDateString());
    cy.get('#now').should('have.text', '25.3.2022');
  });
});

xdescribe('retry test', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.contains('#evilRow td', 'c');
    // click the button which exchanges the row "evilRow" in the table
    cy.get('#exchangeRow').click();
  });

  it('works as expected: verifyText2 will fail because only last command is retry', () => {
    // will fail.. the last command doesn't contain the element which is exchanged in the DOM
    cy.get('#evilRow').find('td').verifyText2('new text');
  });

  describe('getCellWithFind', () => {
    const getCellWithFind = () => cy.get('table').find('#evilRow td'); // this works, as the last command is retried and it contains the element that is replaced in the DOM

    it('verifyText2 should retry', () => {
      getCellWithFind().verifyText2('new text');
    });

    it('verifyText2 should throw timeout error (but we catch it)', () => {
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

    it('verifyText2 should throw timeout error (but we catch it)', () => {
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
