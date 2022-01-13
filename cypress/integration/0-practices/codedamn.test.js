/// <reference types="cypress"/>

describe('Codedamn Testing', () => {
    beforeEach(() => {
        cy.on('uncaught:exception', (err, runnable) => {
            return false
        })
        cy.viewport(1280, 720)
        cy.visit('https://codedamn.com')
    })

    it('URL verification', () => {
        cy.contains('Sign in').click({ force: true })
        cy.url().should('include', '/login')
        cy.contains('Forgot your password?').click({ force: true })
        cy.url().then((value) => {
            cy.log('Current Real URL: ', value)
        })
        cy.log('URL: ', cy.url())
        cy.url().should('include', '/password-reset')
        cy.go('back')
        cy.contains('Create one').click({ force: true })
        cy.url().should('include', '/register')
    })

    it('Login should display correct error', () => {
        cy.contains('Sign in').click({ force: true })
        cy.get('[data-testid="username"]').type('admin@admin.com', { force: true })
        cy.get('[data-testid="password"]').type('admin', { force: true })
        cy.get('[data-testid="login"]').click({ force: true })
    })

    it('Login should work correctly', () => {
        cy.contains('Sign in').click({ force: true })
        cy.get('[data-testid="username"]').type('wahid.rootnext@gmail.com', { force: true })
        cy.get('[data-testid="password"]').type('5*u%YaHMoD3JBub5A3h^', { force: true })
        cy.get('[data-testid="login"]').click({ force: true })
        cy.url().should('include', '/dashboard')
    })
})