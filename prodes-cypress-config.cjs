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
    baseUrl: "https://test-es-template.longboat.com/login?lang=en",
  },
  
  component: {
    devServer: {
      framework: "vue",
      bundler: "vite",
    },
    
  },
  
});
