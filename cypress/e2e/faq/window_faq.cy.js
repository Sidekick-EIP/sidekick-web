context('Window', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/faq')
    })

    it('cy.document() - get the document object', () => {
      cy.document().should('have.property', 'charset').and('eq', 'UTF-8')
    })
  
    it('cy.title() - get the title', () => {
      cy.title().should('include', 'Sidekick')
    })
  })
  