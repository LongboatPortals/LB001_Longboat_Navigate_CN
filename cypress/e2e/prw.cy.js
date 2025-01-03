/* eslint-disable no-undef */

describe('Login Test for PRW apps', () => { 

   
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
 
  
 
 describe('PRW Page Text Verify', () => { 
 
    it('verify-faqs-postive', () => {   //faq open test
     cy.visit('/')
     cy.contains('Accept').click({force: true})
    cy.get('input[name="password"]').type('Longboat!')
    cy.contains('Get Started').click({force:true})
     cy.contains('Open all FAQs').click({force: true})
    })
 
    it('verify-faqsclose-postive', () => {    //faq close test
     cy.visit('/')
     cy.contains('Accept').click({force: true})
     cy.get('input[name="password"]').type('Longboat!')
    cy.contains('Get Started').click({force:true})
     cy.contains('Close all FAQs').click({force: true})
     })
    

   it('verify-button-postive', () => {  //Button test in PRW
   cy.visit('/')
   cy.contains('Accept').click({force: true})
   cy.get('input[name="password"]').type('Longboat!')
    cy.contains('Get Started').click({force:true})
    cy.get('.leftee-layout').contains('Am I Eligible?').should('contain.text' , 'Am I Eligible?').click();
   });
 
   it('verify-Enable Map-postive', () => {   //Map function test PRW
     cy.visit('/')
     cy.contains('Accept').click({force: true})
     cy.get('input[name="password"]').type('Longboat!')
    cy.contains('Get Started').click({force:true})
     cy.contains('Enable Map').click({force: true})
     });
     
  
it('verify-Eligible form-postive', () => {   // Form testing with pre-screener PRW 
     cy.visit('/')
   cy.contains('Accept').click({force: true})
   cy.get('input[name="password"]').type('Longboat!')
    cy.contains('Get Started').click({force:true})
    cy.get('.leftee-layout').contains('Am I Eligible?').click();
   cy.get('[type="checkbox"]').check({force: true})
   cy.get('form input').check(['yes_a'] , {force: true})
   cy.get('#pd-pc-check-elig-btn').click()
   cy.contains('Show Map').click()
   cy.contains('Show List').click()
   cy.get('td.site-title-cell').first().click()
   cy.get("#name").type("Test")
   cy.get("#phone").type("123456789")
   cy.get('select#locations').select('morning')
   cy.get('[type="checkbox"]').check({force: true})
   cy.get('.underline-wrapper').find('.ux-btn').click()
   cy.get('td.site-title-cell').eq(0).click()
   cy.get("#pd-pc-submit-btn").click()
   });

   it('verify-site search bar', () => {
    cy.visit('/')
    cy.contains('Accept').click({force: true})
    cy.get('input[name="password"]').type('Longboat!')
    cy.contains('Get Started').click({force:true})
    cy.get('.leftee-layout').contains('Am I Eligible?').click();
    cy.get('[type="checkbox"]').check({force: true})
    cy.get('form input').check(['yes_a'] , {force: true})
    cy.get('#pd-pc-check-elig-btn').click()
    cy.get('.ui-scroller').scrollTo('bottom')
    const searchQuery = 'D';
    cy.get('.search-input-wrapper').type(`${searchQuery}{enter}`); 
    cy.get('.table-container').click().and('contain', searchQuery)
    cy.get("#name").type("Test")
    cy.get("#phone").type("123456789")
    cy.get('select#locations').select('morning')
    cy.get('[type="checkbox"]').check({force: true})
    cy.get('.underline-wrapper').find('.ux-btn').click()
    cy.get("#pd-pc-submit-btn").click()
    });
 })


   //Accessibility test //

   describe('Accessibility Test prw', () => {
    
    it('Accessibility Test Login page', () => {
    cy.visit('/'); 
    cy.injectAxe(); // inject Axe plugin for Accessiblity test
    cy.checkA11y(null, {
      includedImpacts: ['critical'],
      resultTypes: ['violations']
      }, (violations) => {               // Check for Violation if any critical Violations will fail the test
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

    it('Accessibility Testing for prw main page', () => {
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
       
  
