import { defineConfig } from 'cypress';

export default defineConfig({
  video: false,
  videosFolder: './cypress/videos',
  env: {
    loginEmail: 'automation@test.com',
    passowrd: 'defaultPassword',
    baseUrl: 'http://localhost:4200/',
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
