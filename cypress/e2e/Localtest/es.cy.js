/* eslint-disable no-undef */
 describe('Login Test for ES apps', () => { 
    
    it('verify-Login', () => {
    cy.visit('/')
    cy.contains('Accept').click({force: true})
    cy.get('input[name="password"]').type('Longboat!')
    cy.contains('Get Started').click({force:true})
      })
      it('verify-invalid-Login', () => {
      cy.visit('/')
      cy.contains('Accept').click({force: true})
      cy.get('input[name="password"]').type('Longboat')
      cy.contains('Get Started').click({force:true})
      cy.contains('You have entered the incorrect password.')
        })
      
      });

describe('ES Page Text Verify', () => { 
    it('verify-Survey Button for en lang', () => {
    cy.visit('/')
    cy.contains('Accept').click({force: true})
    cy.get('input[name="password"]').type('Longboat!')
    cy.contains('Get Started').click({force:true})
    cy.get('select#pd-es-lang').select('en')
    cy.get("#pd-es-start-survey").click({force: true})
    cy.get('.radio__input').check(['yes'] , {force: true})
    cy.get('input[name="que7"]').check({force: true})
    cy.get('input[name="que8"]').check({force: true})
    cy.get('form').submit();
    })
  });
 
  //Accessibility test //
  
  describe('Accessibility Test ES', () => {
    it('Accessibility Test Login page', () => {
      cy.visit('/'); 
      cy.injectAxe(); // inject Axe plugin for Accessiblity test
      cy.checkA11y(null, {
        includedImpacts: ['critical'],
        resultTypes: ['violations']
      }, (violations) => {              // Check for Violation if any critical Violations will fail the test
        if (violations.length) {   
          violations.forEach(violation => {
            const nodeTarget = violation.nodes.map(node => node.target).join(', ');
            const logMessage = `${violation.impact.toUpperCase()}: ${violation.id} - ${violation.description}\nElement(s): ${nodeTarget}\nHelp URL: ${violation.helpUrl}\n`;
            cy.task('log', logMessage);
          });
          const criticalViolations = violations.filter(violation => violation.impact === 'critical');
          if (criticalViolations.length) {
            const criticalMessages = criticalViolations.map(violation => `${violation.impact.toUpperCase()}: ${violation.id} - ${violation.description}\nHelp URL: ${violation.helpUrl}`);
            throw new Error(criticalMessages.join('\n'));
          }
        }
      });
    });
  
  
        
   describe('Accessiblity Test Main Page',() =>{
  
      it('Accessibility Testing for ES main page', () => {
        cy.visit('/'); 
        cy.contains('Accept').click({force: true})
        cy.get('input[name="password"]').type('Longboat!')
        cy.contains('Get Started').click({force:true})
        cy.injectAxe(); 
        cy.checkA11y(null, {
          includedImpacts: ['critical'],
          resultTypes: ['violations']
        }, (violations) => {
          if (violations.length) {
            violations.forEach(violation => {
              const nodeTarget = violation.nodes.map(node => node.target).join(', ');
              const logMessage = `${violation.impact.toUpperCase()}: ${violation.id} - ${violation.description}\nElement(s): ${nodeTarget}\nHelp URL: ${violation.helpUrl}\n`;
              cy.task('log', logMessage);
            });
            const criticalViolations = violations.filter(violation => violation.impact === 'critical');
            if (criticalViolations.length) {
              const criticalMessages = criticalViolations.map(violation => `${violation.impact.toUpperCase()}: ${violation.id} - ${violation.description}\nHelp URL: ${violation.helpUrl}`);
              throw new Error(criticalMessages.join('\n'));
            }
          }
        });
      });
    })  
         });