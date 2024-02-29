/// <reference types="cypress" />
import admin from '../../fixtures/admin.json'

 beforeEach(() => {
    cy.visit(admin.loginpage);

    cy.get("#email").type(admin.email);
    cy.get("#password").type(admin.password);
    cy.contains("Sign in").click();

    cy.url().should("include", admin.homepage);
 })

describe('User Edit', () => {
    it('Admin Navigates to User List and Edits a User', () => {
       
        cy.contains("See All Users").click();

        cy.url().should("include", admin.userspage);
        cy.contains("Edit").click();
        
        cy.get("#firstName").type("test");
        cy.get("#lastName").type("test");

        cy.contains("Save").click();
        cy.contains("Cancel").click();

        cy.contains("Jamestest").should('be.visible');
    })
})