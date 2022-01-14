/// <reference types="cypress" />

describe('todo testing', () => {
    beforeEach(() => {
        cy.visit('https://example.cypress.io/todo')
    })

    it('display two todo items by default', () => {
        cy.get('.todo-list li').should('have.length', 2)

        // verification that 2 items available 
        cy.get('.todo-list li').first().should('have.text', 'Pay electric bill')
        cy.get('.todo-list li').last().should('have.text', 'Walk the dog')
    })

    it('add new todo item', () => {
        let newTodo = 'Feed the cat'
        cy.get('[data-test="new-todo"]').type(`${newTodo}{enter}`)

        // verification wheather item added or not
        cy.get('.todo-list li').should('have.length', 3).last().should('have.text', newTodo)
    })

    it('mark a todo item as completed', () => {
        cy.contains('Pay electric bill').parent().find('input[type=checkbox]').check()

        // verification
        cy.contains('Pay electric bill').parents('li').should('have.class', 'completed')
    })


    context('testing with checked items', () => {
        beforeEach(() => {
            cy.visit('https://example.cypress.io/todo')
            cy.contains('Pay electric bill').parent().find('input[type=checkbox]').check()
        })

        it('show only incompleted items', () => {
            cy.get('.filters').find('a').contains('Active').click()
            cy.get('.todo-list li').should('have.length', 1).should('have.text', 'Walk the dog').should('not.have.text', 'Pay electric bill')
        })

        it('remove all completed items', () => {
            cy.get('button').contains('Clear completed').click()
            cy.get('.todo-list li').should('have.length', 1).should('not.have.text', 'Pay electric bill')
            cy.contains('Clear completed').should('not.exist')
        })
    })
})