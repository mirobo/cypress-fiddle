import { visitStaticWebPage } from '../support/commands';

describe('x', () => {
  beforeEach(() => {
    visitStaticWebPage(
      `<html>
       <body>
       <button>b1</button>
       <button>b2</button>
       </body>
       </html>`
    );
  });

  const repetitions = 300;
  it('test', () => {
    Cypress._.times(repetitions, () => {
      cy.get('button').first().should('exist');
    });
  });

  it('test2', () => {
    Cypress._.times(repetitions, () => {
      cy.get('button:first()').should('exist');
    });
  });
});
