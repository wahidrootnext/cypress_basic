/// <reference types="cypress"/>

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IndhaGlkcm9vdG5leHQiLCJfaWQiOiI2MWRmZGViOWIwNjFiZjAwMDliZmMwZWIiLCJuYW1lIjoiTW9oYW1tYWQgV2FoaWQiLCJpYXQiOjE2NDIwNjE0OTgsImV4cCI6MTY0NzI0NTQ5OH0.pFiw7wOB5-sx3lYzEqd3alOUc3LbGZTA5jGz3x1PBUE";

describe('Codedamn Authenticated Testing', () => {
    before(() => {
        cy.then(() => {
            window.localStorage.setItem('__auth__token', token)
        })
    })
    beforeEach(() => {
        cy.on('uncaught:exception', (err, runnable) => {
            return false
        })
        cy.viewport(1280, 720)
        cy.visit('https://codedamn.com/dashboard')
    })

    it('Should load playground properly', () => {
        cy.visit('https://codedamn.com/playground/P0N4q1muNga9QMPIDPl5n')
        cy.contains('Not connection yet. Trying to connect', { timeout: 20 * 1000 }).should('exist')
        cy.contains('Not connection yet. Trying to connect', { timeout: 20 * 1000 }).should('not.exist')
        cy.contains('Waiting for your cloud server to come online', { timeout: 20 * 1000 }).should('exist')
        cy.contains('Waiting for your cloud server to come online', { timeout: 20 * 1000 }).should('not.exist')
        let filename = Math.random()
        cy.get('[data-testid="xterm"]')
            .type('{ctrl}{c}')
            .type('touch ' + filename + '.js{enter}')
        cy.get('[data-fullid="' + filename + '.js"]').click()
        
        cy.get('.view-lines').type('alert(1)')
    })

    it.only('Should rename file properly', () => {
        cy.visit('https://codedamn.com/playground/P0N4q1muNga9QMPIDPl5n')
        cy.contains('Not connection yet. Trying to connect', { timeout: 20 * 1000 }).should('exist')
        cy.contains('Not connection yet. Trying to connect', { timeout: 20 * 1000 }).should('not.exist')
        cy.contains('Waiting for your cloud server to come online', { timeout: 20 * 1000 }).should('exist')
        cy.contains('Waiting for your cloud server to come online', { timeout: 20 * 1000 }).should('not.exist')
        let filename = Math.random()
        cy.get('[data-testid="xterm"]')
        .type('{ctrl}{c}')
        .type('touch ' + filename + '.js{enter}')
        cy.get('[data-fullid="' + filename + '.js"]').rightclick()
        cy.contains('Rename File').click()
        let newfilename = Math.random()
        cy.get('[data-fullid="new_'+newfilename+'.js"]').should('not.exist')
        cy.get('[data-fullid="' + filename + '.js"]').clear().type('new_'+newfilename+'.js{enter}')
        cy.get('[data-fullid="new_'+newfilename+'.js"]', { timeout: 20 * 2000 }).should('exist')
    })
})