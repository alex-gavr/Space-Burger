/// <reference types="cypress" />
// ***********************************************

// @ts-ignore
Cypress.Commands.add('getBySel', (selector) => {
    return cy.get(`[data-test="${selector}"]`);
});


export {};
declare global {
    namespace Cypress {
        interface Chainable {
            getBySel(selector: string): Chainable<Element>
        }
    }
}
