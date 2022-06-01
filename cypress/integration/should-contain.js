it('test 1 with should(contain,..) that work', () => {
  cy.runExample({
    html: `<html><body><p>This is some text<br />with visual line breaks<br />Have fun :-)</p></body></html>`,
    test: `cy.get('p').should('contain','This is some textwith visual line breaksHave fun :-)')`,
  });

  cy.runExample({
    html: `<html><body><p>This is some text<br />with visual line breaks and nbsp <br />Have fun :-)</p></body></html>`,
    test: `cy.get('p').should('contain','This is some textwith visual line breaks and nbsp Have fun :-)')`,
  });
  cy.runExample({
    html: `<html><body><p>This is some text
      with invisible line breaks</p></body></html>`,
    test: `
      cy.get('p').should('contain','This is some text\\n      with invisible line breaks')`,
  });
});

it('test 2 with should(contain,...) that fails with unhelpful error message', () => {
  cy.runExample({
    html: `<html><body><p>This is some text<br />with visual line breaks, nbsp   and line breaks
      in
      the
      DOM<br />Have fun :-)</p></body></html>`,
    test: `
      cy.get('p').should('contain','This is some textwith visual line breaks, nbsp   and line breaks\\n      in\\n      the\\n      DOMHave fun :-)')
      cy.get('p').should('contain','figure out what text was expected')`,
  });
});

it('test 3 with custom method have.textTrimmed that shows the actual text', () => {
  cy.runExample({
    html: `<html><body><p>This is some text<br />with visual line breaks, nbsp   and line breaks
        in
        the
        DOM<br />Have fun :-)</p></body></html>`,
    test: `cy.get('p').should('have.textTrimmed','abc')`,
  });
});
