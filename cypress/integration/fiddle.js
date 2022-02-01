/// <reference types="@cypress/fiddle" />

const cell = () => cy.get('#evilRow td');

describe('retry test', () => {
  beforeEach(() => {
    cy.visit('/');
    cell().contains('c');
    cy.get('#exchangeRow').click();
  });

  /***
   * From: https://docs.cypress.io/guides/core-concepts/retry-ability#Only-the-last-command-is-retried
   * Tip: instead of cy.get(selector).should('contain', text) or cy.get(selector).contains(text) chain,
   * we recommend using cy.contains(selector, text) which is retried automatically as a single command.
   *
   *
   * Problem with recommendation
   *
   * Usually you'd have a page object providing elements as a "callable Cypress.Chainable" (myElement = () => cy.get(...) )
   * Once that Chainable is within the test, there is not way to call cy.contains(..) onto that element.
   * So you're stuck with myElement().contains(..) or myElement().should('contain', '..')
   *
   * something like myElement().contains(..) or myElement().verifyText(..) is much more consise and readable
   */

  it('passes, cy.contains retries', () => {
    cy.contains('#evilRow td', 'new text');
  });

  it('passes, should is retried', () => {
    cell().should('contain', 'new text');
  });

  it('passes, should is retried', () => {
    cell().should('have.textTrimmed', 'new text');
  });

  it('passes, should is retried. but this is not readable when you have a lot of assertions and its much to write', () => {
    cell().should((el) => {
      expect(el).to.have.textTrimmed('new text');
    });
  });

  /**
   * as expected, but its extremly hard to figure out how to make it retryable even after
   * reading https://github.com/cypress-io/cypress/issues/3109 and https://glebbahmutov.com/blog/cypress-should-callback/
   * the xpath example isnt probably to way to go in this case and cypress-pipe and cypress-wait-until seem very cumbersome
   * TODO figure out how to properly include the "textTrimmed/verifyText" idea into cypress?
   * contains is not precise enough as random text could exist around the expected text. and to use regex in
   * every assertion is cumbersome as well
   * */
  it('fails, sadly custom command is not retried', () => {
    cell().verifyText('new text');
  });

  /**
   * From: https://docs.cypress.io/guides/core-concepts/retry-ability#Only-the-last-command-is-retried
   *
   * Now that we understand the real reason behind the flaky test, we need to think about why the default retry-ability has not helped us in this situation.
   * Why hasn't Cypress found the 2 <li> elements after the second one was added?
   * For a variety of implementation reasons, Cypress commands only retry the last command before the assertion. In our test:
   *
   * cy.get('.new-todo').type('todo B{enter}')
   * cy.get('.todo-list li') // queries immediately, finds 1 <li>
   *   .find('label') // retried, retried, retried with 1 <li>
   *   .should('contain', 'todo B') // never succeeds with only 1st <li>
   */

  it('last command "find()" is not retried, even though it is the last command?', () => {
    cy.get('tbody').find('#evilRow td').contains('new text');
  });

  it('last command "cy.get()" is not retried, but its only ONE command?', () => {
    cell().contains('new text');
  });
});
