it('test 1 with should(contain,..) that work', () => {
  cy.runExample({
    html: `<html><body><p> This is some text<br />with visual line breaks<br />Have fun :-) </p></body></html>`,
    test: `cy.get('p').should('contain','This is some textwith visual line breaksHave fun :-)')`,
  });

  cy.runExample({
    html: `<html><body><p> This is some text<br />with visual line breaks and nbsp <br />Have fun :-) </p></body></html>`,
    test: `cy.get('p').should('contain','This is some textwith visual line breaks and nbsp Have fun :-)')`,
  });
  cy.runExample({
    html: `<html><body><p> This is some text
      with invisible line breaks </p></body></html>`,
    test: `
      cy.get('p').should('contain','This is some text\\n      with invisible line breaks')`,
  });
});

it('test 2A with cy.get(..).contains(..) that fails with unhelpful error message', () => {
  cy.runExample({
    html: `<html><body><p> This is some text<br />with visual line breaks, nbsp   and line breaks
      in
      the
      DOM<br />Have fun :-) </p></body></html>`,
    test: `
      cy.contains('This is some textwith visual line breaks, nbsp   and line breaks\\n      in\\n      the\\n      DOMHave fun :-)')
      cy.get('p').contains('does not trigger a useful error message, we dont see the actual text of the element. and it does not work the same way as should(contain,...)')`,
  });
});

it('test 2A with cy.contains(..) that fails with unhelpful error message', () => {
  cy.runExample({
    html: `<html><body><p> This is some text<br />with visual line breaks, nbsp   and line breaks
      in
      the
      DOM<br />Have fun :-) </p></body></html>`,
    test: `
      cy.contains('This is some textwith visual line breaks, nbsp   and line breaks\\n      in\\n      the\\n      DOMHave fun :-)')
      cy.contains('does not trigger a useful error message, we dont see the actual text of the element. and it does not work the same way as should(contain,...)')`,
  });
});

it('test 2C with should(contain,...) that fails with unhelpful error message', () => {
  cy.runExample({
    html: `<html><body><p> This is some text<br />with visual line breaks, nbsp   and line breaks
      in
      the
      DOM<br />Have fun :-) </p></body></html>`,
    test: `
      cy.get('p').should('contain','This is some textwith visual line breaks, nbsp   and line breaks\\n      in\\n      the\\n      DOMHave fun :-)')
      cy.get('p').should('contain','does not trigger a useful error message, we dont see the actual text of the element')`,
  });
});

it('test 3 with should(have.text) that fails with helpful message and strips non-breaking spaces for our convenience', () => {
  cy.runExample({
    html: `<html><body><p> This is some text<br />with visual line breaks, nbsp   and line breaks
        in
        the
        DOM<br />Have fun :-) </p></body></html>`,
    test: `
        cy.get('p').should('have.text',' This is some textwith visual line breaks, nbsp   and line breaks\\n        in\\n        the\\n        DOMHave fun :-) ');
        cy.get('p').should('have.text','triggers a useful error message')`,
  });
});

it('test 4 with custom assertion should(have.textTrimmed,...) that fails with helpful message and strips non-breaking spaces and line-breaks for our convenience', () => {
  cy.runExample({
    html: `<html><body><p> This is some text<br />with visual line breaks, nbsp   and line breaks
            in
            the
            DOM<br />Have fun :-) </p></body></html>`,
    test: `
        cy.get('p').should('have.textTrimmed','This is some textwith visual line breaks, nbsp   and line breaks             in             the             DOMHave fun :-)')
        cy.get('p').should('have.textTrimmed','triggers a useful error message')
    `,
  });
});
