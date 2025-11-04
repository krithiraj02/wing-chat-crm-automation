require("dotenv").config();

const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.WING_URL || "https://test.wing.work",
    env: {
      WING_USERNAME: process.env.WING_USERNAME,
      WING_PASSWORD: process.env.WING_PASSWORD,
      screenshotOnRunFailure: true,
      video: false,
    },
  },
});
