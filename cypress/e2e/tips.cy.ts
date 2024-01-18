describe('Tips page', () => {
  beforeEach(() => {
    cy.clearCookies()
    cy.visit('http://localhost:3000/signin');
    cy.get('input[type="email"]').type('fat@tips.com');
    cy.get('input[type="password"]').type('@Bonjour1');
    cy.get('.flex-row').click();
    cy.get('.MuiBox-root > .MuiButtonBase-root').click();
    cy.get('.MuiList-root > :nth-child(1)').click();
  });

  it('should render the tips page with all it s components', () => {
    cy.visit('http://localhost:3000/tips');

    cy.get('.pt-2')
    cy.get('.pt-4 > .text-white')
    cy.get('.py-3')
  });
})