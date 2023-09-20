describe('Stepper', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/signup');
  });

  it('should highlight the active link', () => {
    cy.get('a[href="/signup"]').should('have.class', 'text-orange-400');
    cy.get('a[href="/signup/infos"]').click();
    cy.get('a[href="/signup"]').should('not.have.class', 'text-orange-400');
    cy.get('a[href="/signup/infos"]').should('have.class', 'text-orange-400');
  });

  it('should navigate to different steps', () => {
    cy.get('a[href="/signup/sport"]').click();

    cy.url().should('eq', 'http://localhost:3000/signup/sport');
  });
});
