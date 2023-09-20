describe('Section "Decouvrir le projet"', () => {
    it('Devrait afficher les informations correctes', () => {
      cy.visit('http://localhost:3000');
      cy.contains('Decouvrir le projet').should('be.visible');
      cy.contains('Sidekick est une application qui met en relation').should('be.visible');
    });
  });
  