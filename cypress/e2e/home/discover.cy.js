describe('Section "Decouvrir le projet"', () => {
    it('Devrait afficher les informations correctes', () => {
      cy.visit('http://localhost:3000');
      cy.contains('Decouvrir le projet').should('be.visible');
      cy.contains('Avec une série de fonctionnalités sociales, Sidekick est là pour faire bouger les choses.').should('be.visible');
    });
  });
  