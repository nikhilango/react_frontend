/// <reference types="cypress" />
import { ErrorMessage } from 'formik'
import admin from '../../fixtures/admin.json'

beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

describe('Admin Login', () => {
    it('Logs Admin in to Homepage', () => {
        cy.visit(admin.loginpage)

        cy.get("#email").type(admin.email);
        cy.get("#password").type(admin.password);
        cy.contains('Sign in').click();

        cy.url().should("include", "http://localhost:3000"); 
    });

    it('Navigates Admin to Homepage', () => {
    
    })
})