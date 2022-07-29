import { thisDoesNotExist } from '../support/commands';

it('a dummy test with compilation error', () => {
  cy.log('test 1');
  thisDoesNotExist();
});
