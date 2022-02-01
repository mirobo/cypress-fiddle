/// <reference types="@cypress/fiddle" />

it('passes, cy.contains retries getting element', () => {
  cy.visit('/');
  const cell = () => cy.get('#evilRow td');
  cell().contains('c');
  cy.get('#btn').click();

  cy.contains('#evilRow td', 'new text');
});

it('fails, cy.get is not retried', () => {
  cy.visit('/');
  const cell = () => cy.get('#evilRow td');
  cell().contains('c');
  cy.get('#btn').click();
  cell().contains('new text');
});

// const helloTest = {
//     html: `
//     <script>
//     $( "#btn" ).click(function() {
//         alert( "Handler for .click() called." );
//       });
//       </script>
//       <div>Hello</div>
//       <button id=btn>my button</button>
//     `,

//     test: `
//       //cy.get('div').should('have.text', 'Hello')
//       cy.get('#btn').click()
//     `
//   }

//   it('tests hello', () => {
//     cy.runExample(helloTest)
//   })
