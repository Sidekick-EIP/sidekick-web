describe('Header', () => {
  it('should display the Sidekick logo', () => {
    cy.visit('http://localhost:3000');
    cy.get('img[alt="Sidekick"]').should('be.visible');
  });

  it('should navigate to login page when clicking "Login"', () => {
    cy.visit('http://localhost:3000');
    cy.get('[href="/signin"] > .MuiButtonBase-root').click();
    cy.url().should('eq', 'http://localhost:3000/signin');
  });

  it('should navigate to signup page when clicking "Signup"', () => {
    cy.visit('http://localhost:3000');
    cy.get('[href="/signup"] > .bg-white').click();
    cy.url().should('eq', 'http://localhost:3000/signup');
  });

  it('should navigate to beta page when clicking "Beta"', () => {
    cy.visit('http://localhost:3000');
    cy.get('[href="/beta"] > .MuiButtonBase-root').click();
    cy.url().should('eq', 'http://localhost:3000/beta');
  });
});
