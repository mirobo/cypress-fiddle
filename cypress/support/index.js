// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import './commands';
// adds "cy.runExample()" command
import '@cypress/fiddle';

// const driveByErrorEnvVarName = 'driveByErrors';
// export const getDriveByErrors = () => Cypress.env(driveByErrorEnvVarName);
// export const initDriveByErrors = () => Cypress.env(driveByErrorEnvVarName, []);
// export const addDriveByError = (obj) => {
//   getDriveByErrors().push(obj);
// };

// before(() => {
//   initDriveByErrors();
// });

// afterEach(function () {
//   const testReference = `${this.currentTest.parent.file}: ${this.currentTest.title}`;
//   if (Math.random() < 0.5) {
//     addDriveByError({
//       testReference,
//       consoleErrors: ['a', 'b', 'c'],
//       validationErrors: ['d', 'e'],
//     });
//   }
// });

// after(function () {
//   if (Cypress.env('driveByErrorsEnabled')) {
//     const driveByErrors = getDriveByErrors();
//     for (const error of driveByErrors) {
//       cy.log(error);
//     }

//     // not sure if it's better to let the test fail with an assertion
//     // or with throwing an error..
//     // expect(
//     //   driveByErrors,
//     //   `found a total of ${driveByErrors.length} drive-by errors in!\r\n${JSON.stringify(driveByErrors, null, 2)}`
//     // ).to.have.length(0);
//     if (driveByErrors.length) {
//       throw new Error(
//         `found a total of ${driveByErrors.length} drive by errors!\r\n${JSON.stringify(driveByErrors, null, 2)}`
//       );
//     }
//   }
// });
