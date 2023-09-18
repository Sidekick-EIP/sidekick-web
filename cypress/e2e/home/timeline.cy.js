describe('Section "La timeline du projet"', () => {
    it('Devrait afficher une image', () => {
      cy.visit('http://localhost:3000');
      cy.contains('La timeline du projet').should('be.visible');
      cy.get('img[src="../timetable.png"]').should('be.visible');
    });
  });
  