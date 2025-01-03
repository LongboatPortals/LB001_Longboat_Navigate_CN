/* eslint-disable no-undef */
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on) {
      on('task', {
        log(message) {                 // Accessiblity log function define
          console.log(message)
          return null
        },
      })
    },
    baseUrl: process.env.BASE_URL || "http://localhost:8080/?lang=en",
  },
  
  component: {
    devServer: {
      framework: "vue",
      bundler: "vite",
    },
    
  },
  
});
