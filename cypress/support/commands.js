// Cypress.Commands.add("verifyText", { prevSubject: ["element"] }, (subject, expected) => {
//   // any simple way to make this retryable? and keep the advantage of calling this function directly on a Cypress.Chainable?
//   expect(subject).to.have.textTrimmed(expected);
// });

Cypress.Commands.add('verifyValue', { type: 'assertion', prevSubject: ['element'] }, (subject, expected) => {
  expect(subject).to.have.textTrimmed(expected);
});

Cypress.Commands.add('verifyValue2', { type: 'assertion', prevSubject: ['element'] }, (subject, expected) => {
  // Cypress.log({ message: subject });
  // subject().should("have.textTrimmed", expected);
  expect(subject).to.have.textTrimmed(expected);
});

Cypress.Commands.add('verifyValue3', { type: 'assertion', prevSubject: ['element'] }, (subject, expected) => {
  // const wrappedSubject = Cypress.dom.wrap(subject);
  // const textValue = getElementValueOrText(wrappedSubject);
  // console.log(textValue);
  // expect(textValue).to.have.textTrimmed(expected);

  const getTrimmedText = () => {
    // const wrappedSubject = Cypress.dom.wrap(subject);
    // const textValue = getElementValueOrText(wrappedSubject);
    // return textValue;
    return subject;
  };

  const retryGetTrimmedText = () => {
    return Cypress.Promise.try(getTrimmedText).catch((err) => {
      // options.error = err;
      console.log(err);
      throw err;

      return Cypress.Promise.retry(retryGetTrimmedText);
    });
  };

  return Cypress.Promise.try(retryGetTrimmedText).then((trimmedText) => {
    expect(trimmedText).to.have.textTrimmed(expected);
    // return cy
    //   .now("click", options.$el, {
    //     $el: options.$el,
    //     log: false,
    //     verify: false,
    //     errorOnSelect: false, // prevent click errors since we want the select to be clicked
    //     _log: options._log,
    //     force: options.force,
    //     timeout: options.timeout,
    //     interval: options.interval,
    //   })
    //   .then(() => {})
    //   .then(() => {
    //     const verifyAssertions = () => {
    //       return cy.verifyUpcomingAssertions(options.$el, options, {
    //         onRetry: verifyAssertions,
    //       });
    //     };

    //     return verifyAssertions();
    //   });
  });

  // Cypress.log({ message: subject });
  //Cypress.Chainable < JQuery < HTMLElement >>
  // expect(subject).to.have.textTrimmed(expected);
  // expect(subject).to.have.textTrimmed(expected);

  // const resolveValue = () => {
  //   return Cypress.Promise.try(getValue).then((value) => {
  //     if (!isPrimitive(value)) {
  //       value = Cypress.$(value);
  //       // Add the ".selector" property because Cypress uses it for error messages
  //       value.selector = selector;
  //     }
  //     return cy.verifyUpcomingAssertions(value, options, {
  //       onRetry: resolveValue,
  //     });
  //   });
  // };

  // return resolveValue().then((value) => {
  //   if (options.log !== false) {
  //     // TODO set found elements on the command log?
  //     Cypress.log(log);
  //   }
  //   return value;
  // });

  // const resolveElements = () => {
  //   const selector = Cypres.dom.getC
  // const getOptions = Cypress._.extend({}, options, {
  //   // error: getErr(text, phrase)
  //   withinSubject: subject || cy.state("withinSubject") || cy.$$("body"),
  //   filter: true,
  //   log: false,
  //   // retry: false ## dont retry because we perform our own element validation
  //   verify: false, // dont verify upcoming assertions, we do that ourselves
  // });

  //   return cy.now("get", selector, getOptions).then(($el) => {
  //     if ($el && $el.length) {
  //       $el = Cypress.dom.getFirstDeepestElement($el);
  //     }

  //     setEl($el);

  //     return cy.verifyUpcomingAssertions($el, options, {
  //       onRetry: resolveElements,
  //       onFail(err) {
  //         switch (err.type) {
  //           default:
  //             return err;
  //             break;
  //         }

  //         return null;
  //       },
  //     });
  //   });
  // };

  // return Cypress.Promise.try(resolveElements);
});

// Cypress.Commands.add("verifyText2", { prevSubject: ["element"] }, (subject, expected) => {
//   const log = {
//     name: "verifyText2",
//     message: `'${expected}'`,
//   };
//   Cypress.log(log);

//   const verifyTextTrimmed = () => {
//     expect(subject).to.have.textTrimmed(expected);
//   };

//   const resolveValue = () => {
//     return Cypress.Promise.try(verifyTextTrimmed).then(($el) => {
//       if (!Cypress.dom.isJquery($el)) {
//         $el = Cypress.$($el);
//       }
//       return cy.verifyUpcomingAssertions($el, options, {
//         onRetry: resolveValue,
//       });
//     });
//   };

//   return resolveValue().then((el) => {
//     log.consoleProps = () => {
//       return {
//         result: el,
//       };
//     };
//     return el;
//   });
// });

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
    //console.log(actualTextEscaped, explanation);
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
