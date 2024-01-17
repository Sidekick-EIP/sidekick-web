describe('Section "La timeline du projet"', () => {
    it('Devrait afficher une image', () => {
      cy.visit('http://localhost:3000');
      cy.contains('Notre Roadmap').should('be.visible');
      cy.contains('Voici notre roadmap, elle est amenée à évoluer au fil du temps.').should('be.visible');
    });
  });
  