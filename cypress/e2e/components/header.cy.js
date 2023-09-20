describe('Header', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should display the Sidekick logo', () => {
    cy.get('img[alt="Sidekick"]').should('be.visible');
  });

  it('should display navigation links', () => {
    cy.get('nav a').should('have.length', 3);
    cy.get('nav a').eq(0).should('have.text', 'Login');
    cy.get('nav a').eq(1).should('have.text', 'Signup');
    cy.get('nav a').eq(2).should('have.text', 'Beta');
  });

  it('should navigate to login page when clicking "Login"', () => {
    cy.contains('Login').click();
    cy.url().contains('http://localhost:3000/signin');
  });

  it('should navigate to signup page when clicking "Signup"', () => {
    cy.contains('Signup').click();
    cy.url().contains('http://localhost:3000/signup');
  });

  it('should navigate to beta page when clicking "Beta"', () => {
    cy.contains('Beta').click();
    cy.url().should('include', '/beta');
  });
});
