import { defineConfig } from "cypress";

export default defineConfig({
  video: false,
  videosFolder: './cypress/videos',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
