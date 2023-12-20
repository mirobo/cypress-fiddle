const cypress = require('cypress');

// we cannot set environment CYPRESS_INTERNAL_ENV directly :-(
process.env['CYPRESS_INTERNAL_ENV'] = 'development';
process.env['API_RETRY_INTERVALS'] = '1000,1000,1000';

const runOptions = {
  // tag: process.argv[2], // abusing "tag" to hand over the response status code that the dummy dashboard server should return
  spec: process.argv[3],
  // record: true,
  // parallel: true,
  // watchForFileChanges: false,
  // key: 'dummyKey',
  // ciBuildId: '123',
};
console.log(`runOptions: ${JSON.stringify(runOptions)}`);

cypress
  .run(runOptions)
  .then((result) => {
    if (result.failures) {
      // console.error(JSON.stringify(result));
      printRedFailure(result);
      process.exit(1);
    }
    if (result.totalFailed > 0) {
      printRedFailure(JSON.stringify(result, null, 2));
      process.exit(1);
    } else {
      console.log('All tests passed');
      printGreenSuccess(result);
      // console.log(JSON.stringify(result, null, 2));
    }
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

// const cypressPromises = [cypress.run(runOptions)];
// Promise.all(cypressPromises)
//   .then((results) => {
//     console.log(JSON.stringify(results));
//     // console.log(`result.totalFailed: ${results[0].totalFailed}`);
//     if (results.some((result) => result.totalFailed > 0)) {
//       console.log(`Tests failed - setting exit code to 1`);
//       // process.exitCode = 1;
//     }
//   })
//   .catch((err) => {
//     console.log(`error occurred - setting exit code to 2`);
//     console.log(err);
//     // process.exitCode = 2;
//   });

const OCTESC = '\033';

function printGreenSuccess(message) {
  console.log(`${OCTESC}[1;32m ✔ \"${message}\"${OCTESC}[0m${OCTESC}[32m executed successfully!${OCTESC}[0m`);
}

function printRedFailure(message) {
  console.log(`${OCTESC}[1;31m ✘ \"${message}\"${OCTESC}[0m${OCTESC}[31m failed!${OCTESC}[0m`);
}
