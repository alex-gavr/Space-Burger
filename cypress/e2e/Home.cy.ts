/// <reference types="cypress" />
import '../support/commands'
import '@4tw/cypress-drag-drop';


describe('Here we test home component aka user order flow ', () => {
    it('should load without crashing', () => {
        cy.visit('http://localhost:3000');
    });

    it('should login', () => {
        
        cy.getBySel('profileButton').click();
        cy.getBySel('emailInput').type(Cypress.env('email'));
        cy.getBySel('passwordInput').type(Cypress.env('password'));
        cy.getBySel('loginButton').click();
        cy.getBySel('logo').click();
    });

    it('should click ingredient, modal should open, wait for 1 secs and close the modal', () => {
        cy.getBySel('ingredient-60d3b41abdacab0026a733c6').click();
        cy.wait(1000);
        cy.getBySel('modal-close-button').click();
    });
    it('should drag bun to constructor', () => {
        cy.wait(1000);
        cy.getBySel('ingredient-60d3b41abdacab0026a733c6').trigger('dragstart');
        cy.getBySel('drag-destination')
            .trigger('dragenter', { force: true })
            .trigger('dragover', { force: true })
            .trigger('drop', { force: true })
            .wait(50)
            .trigger('dragend', { force: true });
    });
    it('should drag ingredient to constructor', () => {
        cy.getBySel('ingredient-60d3b41abdacab0026a733ca').trigger('dragstart');
        cy.getBySel('drag-destination')
            .trigger('dragenter', { force: true })
            .trigger('dragover', { force: true })
            .trigger('drop', { force: true })
            .wait(50)
            .trigger('dragend', { force: true });
    });
    it('should press make order button, wait for 1 second and close the modal', () => {
        cy.wait(1000);
        cy.getBySel('makeOrderButton').click();
        cy.wait(1000);
        cy.getBySel('modal-close-button').click();
    });
});
