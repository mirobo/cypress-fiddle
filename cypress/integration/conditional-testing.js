import { visitStaticWebPage, ifElseVisible } from '../support/commands';

xit('test', () => {
  Cypress._.times(5, () => {
    visitStaticWebPage(
      `<html>
      <body>
      <p>The button might appear here</p>
      <div id="output"></div>
      <script>
        if (Math.random() < 0.5) {
        const output = document.getElementById('output')
        const btn = document.createElement('button')
        btn.innerHTML = 'Click Me'
        output.appendChild(btn)
        btn.addEventListener('click', () => {
        console.log('Clicked')
        })
        }
      </script>
      </body>
      </html>`
    );

    // cy.contains('The button might appear here');
    ifElseVisible(
      () => cy.get('button'),
      (x) => {
        x().click();
        x().should('be.visible');
      },
      (x) => {
        x().should('not.exist');
      }
    );
  });
});
