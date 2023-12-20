// describe(
//   'a',
//   {
//     retries: 0,
//   },
//   () => {
const a = [1, 2, 3, 4, 5];
a.forEach((x) => {
  it(`${x}`, () => {
    if (x === 3) {
      cy.log('let it fail');
    } else {
      cy.log('good');
    }
  });
});
//   }
// );

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
