/// <reference types="cypress" />
import user from '../../fixtures/user.json'
import admin from '../../fixtures/admin.json'

 beforeEach(() => {
    cy.visit(user.loginpage);

    cy.get("#email").type(user.email);
    cy.get("#password").type(user.password);
    cy.screenshot();
    cy.contains("Sign in").click();

    cy.url().should("include", user.homepage);
 })

 describe('Add Group', () => { 
    it('User navigates to Add Group Form and tries to add a Group', () =>{

        cy.contains("Add Group").click();
        cy.url().should("include", admin.groupedit);
        cy.screenshot();

        cy.get("#name").type("testname");
        cy.get("#description").type("testdescription");
        cy.contains("Add").click();

        cy.contains("testname").should('be.visible');
        cy.contains("testdescription").should('be.visible');
    }
    )
 })