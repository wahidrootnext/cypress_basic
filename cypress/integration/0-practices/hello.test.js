/// <reference types="cypress"/>

describe('hello world', () => {
    it('throw error', () => {
        throw new Error('Something wrong')
    })
})