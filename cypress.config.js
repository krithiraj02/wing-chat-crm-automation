import dotenv from "dotenv";
import { defineConfig } from "cypress";

dotenv.config();

export default defineConfig({
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false,
    html: false,
    json: true
  },

  e2e: {
    baseUrl: "https://test.wing.work",
    env: {
      WING_USERNAME: process.env.WING_USERNAME,
      WING_PASSWORD: process.env.WING_PASSWORD,
      screenshotOnRunFailure: true,
      video: false,
    },
    setupNodeEvents(on, config) {
      // node event listeners
    },
  },
});
