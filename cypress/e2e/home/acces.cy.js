describe('Page d\'accueil', () => {
    it('Devrait s\'afficher correctement', () => {
      cy.visit('http://localhost:3000');
      cy.contains('Ensemble, allons plus loin !').should('be.visible');
      cy.contains('Sidekick c’est la fusion d’une application').should('be.visible');
    });
  });
  