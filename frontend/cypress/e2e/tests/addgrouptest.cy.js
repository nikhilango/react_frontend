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

describe('Add Group', () => { 
    it('Admin navigates to Add Group Form and adds a Group', () =>{

        cy.contains("Add Group").click();
        cy.url().should("include", admin.groupedit);
        cy.screenshot();

        cy.get("#name").type("testname");
        cy.get("#description").type("testdescription");
        cy.contains("Add").click();
        cy.screenshot();

        cy.contains("testname").should('be.visible');
        cy.contains("testdescription").should('be.visible');
        cy.screenshot();
    }
    )
 })