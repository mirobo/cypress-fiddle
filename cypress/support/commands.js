Cypress.Commands.add('verifyText', { type: 'assertion', prevSubject: ['element'] }, (subject, expected) => {
  expect(subject).to.have.textTrimmed(expected);
});

Cypress.Commands.add('verifyText2', { type: 'assertion', prevSubject: ['element'] }, (subject, expected) => {
  return Cypress.Promise.try(() => subject).then((trimmedText) => {
    expect(trimmedText).to.have.textTrimmed(expected);
  });
});

chai.use((chai, _utils) => {
  chai.Assertion.addMethod('textTrimmed', function (expected) {
    // eslint-disable-next-line no-underscore-dangle
    const $element = this._obj;
    new chai.Assertion($element).to.exist; // NOSONAR
    const actual = getElementValueOrText($element)
      .replace(/\u00A0/g, ' ') // replace non-breaking space
      .replace(/\u200B/g, '') // replace zero width space
      .replace(/\s/g, ' ') // replace new lines, tabs with normal space
      .trim();
    let isEqual;
    if (expected instanceof RegExp) {
      isEqual = !!actual.match(expected);
    } else {
      isEqual = actual === `${expected}`;
    }

    const actualTextEscaped = escape(actual);
    const explanation = `but the TRIMMED text was #{act}. Actual text escaped: '${actualTextEscaped}'`;
    console.log(actualTextEscaped, explanation);
    this.assert(
      isEqual,
      `expected #{this} to have text #{exp}, ${explanation}`,
      `expected #{this} not to have text #{exp}, ${explanation}`,
      expected,
      actual,
      true
    );
  });
});

function getElementValueOrText(element) {
  if (typeof element === 'string') {
    return element;
  }
  return element.prop('tagName') === 'INPUT' ? `${element.val()}` : element.text();
}
