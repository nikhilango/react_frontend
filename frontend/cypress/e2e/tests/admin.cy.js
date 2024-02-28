/// <reference types="cypress" />
import admin from '../../fixtures/admin.json'

 beforeEach(() => {
 cy.visit(admin.loginpage);

 cy.get("#email").type(admin.email);
 cy.get("#password").type(admin.password);
 cy.contains("Sign in").click();

 cy.url().should("include", admin.homepage);
 })

describe('Admin Login', () => {
    it('Navigates Admin to Homepage', () => {
       
        cy.contains("10 Users").click();
        cy.contains("See All Users").click();

        cy.url().should("include", admin.userspage);
    })
})