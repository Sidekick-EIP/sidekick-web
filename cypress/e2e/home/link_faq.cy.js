describe('Lien vers la page FAQ', () => {
    it('Devrait rediriger vers la page FAQ', () => {
      cy.visit('http://localhost:3000');
      cy.get(':nth-child(8) > .text-gray-900').click();
      cy.url()
        .should('eq', 'http://localhost:3000/faq')
    });
  });
  