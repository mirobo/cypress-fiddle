const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: 'mirobo-cypress-fiddle',
  e2e: {
    specPattern: ['cypress/e2e/**/*.cy.{js,jsx,ts,tsx}', 'cypress/integration/**/*.js'],
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
