describe('Section "L\'équipe"', () => {
    it('Devrait afficher les informations sur l\'équipe', () => {
      cy.visit('http://localhost:3000');
      cy.contains('Alex A').should('be.visible');
      cy.contains('Je suis la touche graphique du groupe.').should('be.visible');
    });
  });
  