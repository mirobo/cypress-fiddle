// const driveByErrorEnvVarName = 'driveByErrors';
// export function getDriveByErrors() {
//   Cypress.env(driveByErrorEnvVarName);
// }
// export function initDriveByErrors() {
//   debugger;
//   Cypress.env(driveByErrorEnvVarName, []);
// }
// export function addDriveByError(obj) {
//   getDriveByErrors().push(obj);
// }

Cypress.Commands.add('verifyText', { type: 'assertion', prevSubject: ['element'] }, (subject, expected) => {
  expect(subject).to.have.textTrimmed(expected);
});

Cypress.Commands.add('verifyText2', { type: 'assertion', prevSubject: ['element'] }, (subject, expected) => {
  return Cypress.Promise.try(() => subject).then((subject) => {
    expect(subject).to.have.textTrimmed(expected);
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

export function ifElseVisible(cyChainable, ifFn, elseFn) {
  return ifElse(cyChainable, (el) => Cypress.dom.isElement(el) && Cypress.dom.isVisible(el), ifFn, elseFn);
}

export function ifElse(cyChainable, conditionCallback, ifFn, elseFn) {
  cyChainable()
    .should((_) => {})
    .then(($el) => {
      const result = conditionCallback($el);
      Cypress.log({
        name: 'ifElse',
        message: `conditionCallback returned ${result}, calling ${result ? 'ifFn' : 'elseFn'}`,
        type: 'parent',
        consoleProps: () => {
          return {
            conditionCallback,
          };
        },
      });
      if (result) {
        ifFn(cyChainable);
      } else {
        if (elseFn) {
          elseFn(cyChainable);
        }
      }
    });
  return cyChainable;
}

export function visitStaticWebPage(webpageContent) {
  cy.intercept({ url: '/staticMockedWebPage', method: 'GET' }, (req) => {
    req.reply(200, webpageContent);
  });
  cy.visit('/staticMockedWebPage');
}
