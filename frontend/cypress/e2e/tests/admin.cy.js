/// <reference types="cypress" />
import admin from '../../fixtures/admin.json'

 beforeEach(() => {
    cy.visit(admin.loginpage);

    cy.get("#email").type(admin.email);
    cy.get("#password").type(admin.password);
    cy.screenshot();
    cy.contains("Sign in").click();

    cy.url().should("include", admin.homepage);
 })

describe('Edit User', () => {
    it('Admin Navigates to User List and Edits a User', () => {
       
        cy.contains("See All Users").click();
        cy.url().should("include", admin.userspage);
        cy.screenshot();
        cy.contains("Edit").click();
        
        cy.get("#firstName").type("test");
        cy.get("#lastName").type("test");
        cy.screenshot();

        cy.contains("Save").click();

        cy.contains("Jamestest").should('be.visible');
        cy.screenshot();
    })
})