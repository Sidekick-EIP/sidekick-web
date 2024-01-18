describe('Planning page', () => {
  beforeEach(() => {
    cy.clearCookies()
    cy.visit('http://localhost:3000/signin');
    cy.get('input[type="email"]').type('fat@tips.com');
    cy.get('input[type="password"]').type('@Bonjour1');
    cy.get('.flex-row').click();
    cy.get('.MuiBox-root > .MuiButtonBase-root').click();
    cy.get('.MuiList-root > :nth-child(1)').click();
  });

  it('should render the planning page with all it s components', () => {
    cy.visit('http://localhost:3000/planning');
    cy.get('.max-w-3xl > .pt-3')
    cy.get('fieldset.flex-row > :nth-child(2) > .MuiButtonBase-root')
    cy.get('#countries')
    cy.get(':nth-child(1) > :nth-child(1) > .pt-2 > .py-3')
    cy.get(':nth-child(3) > .pt-2 > .py-3')
    cy.get('.pt-3.text-center > .pt-3')
  });
})