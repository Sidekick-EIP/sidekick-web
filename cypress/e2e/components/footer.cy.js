describe('Footer', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('should display the Sidekick logo', () => {
    cy.get('img[alt="Sidekick"]').should('be.visible');
  });

  it('should display LinkedIn and Instagram links', () => {
    cy.get('a[href="https://www.linkedin.com/company/sidekick-eip/"]').should('exist');
    cy.get('a[href="https://www.instagram.com/sidekick_eip/"]').should('exist');
  });

  it('should navigate to LinkedIn when clicking the LinkedIn link', () => {
    cy.get('a[href="https://www.linkedin.com/company/sidekick-eip/"]').click();
  });
});
