describe('application should load', () => {
    beforeEach(() => {
        cy.visit('localhost:3000')
      })
     
    it('should create a new spending', () => {
        cy.get('#description').type('Mango')
        cy.get('#amount').clear().type('1200')
        cy.get('#currency').select('USD')
        cy.get('button').contains('Save').click()

        cy.get('.spending-list').children().first().should('contain', 'Mango')
    }) 
})
