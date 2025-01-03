/* eslint-disable no-undef */

 describe('Login Test for CN apps', () => { 
    
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

describe('CN Page Text Verify', () => { 

    it('verify-button and dropdown EN menu-postive', () => {
        cy.visit('/')
        cy.contains('Accept').click({force: true})
        cy.get('input[name="password"]').type('Longboat!')
        cy.contains('Get Started').click({force:true})
        cy.get('select.ux-select.cn-lang-dropdown').select('en')
        cy.get('.ux-copyright-link').click({force: true})
      });

        it('verify-Log out', () => {
        cy.visit('/')
        cy.contains('Accept').click({force: true})
        cy.get('input[name="password"]').type('Longboat!')
       cy.contains('Get Started').click({force:true})
       cy.contains('Log Out').click({force: true})
        
      });
      
  });


  //Accessibility test //
 
  describe('Accessibility Test CN', () => {
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
  
      it('Accessibility Testing for CN main page', () => {
        cy.visit('/'); 
        cy.contains('Accept').click({force: true})
        cy.get('input[name="password"]').type('Longboat!')
        cy.contains('Get Started').click({force:true})
        //cy.wait(3000);
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
         
