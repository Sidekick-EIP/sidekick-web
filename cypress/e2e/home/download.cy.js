describe('Liens de téléchargement', () => {
    it('Devraient rediriger vers les fichiers de téléchargement', () => {
      cy.visit('http://localhost:3000');
      cy.contains('Get for Android').should('have.attr', 'href', '/app-release.apk');
      cy.contains('Get for iOS').should('have.attr', 'href', '/');
    });
  });
  