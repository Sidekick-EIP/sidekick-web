describe('Lien vers la page FAQ', () => {
    it('Devrait rediriger vers la page FAQ', () => {
      cy.visit('http://localhost:3000');
      cy.contains('FAQ').should('have.attr', 'href', '/faq');
    });
  });
  