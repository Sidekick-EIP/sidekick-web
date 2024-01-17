describe('Profile Page', () => {
    beforeEach(() => {
        cy.clearCookies()
        cy.visit('http://localhost:3000/signin');
        cy.get('input[type="email"]').type('fat@tips.com');
        cy.get('input[type="password"]').type('@Bonjour1');
        cy.get('.flex-row').click();
        cy.get('.MuiBox-root > .MuiButtonBase-root').click();
        cy.get('.MuiList-root > :nth-child(1)').click();
    });

    it('should render the Home page with user information', () => {
        cy.contains('Information personnel').should('exist');
        cy.contains('Date de naissance').should('exist');
        cy.contains('Taille').should('exist');
        cy.contains('Poids').should('exist');
        cy.contains('Description').should('exist');
        cy.contains('Activité et objectif').should('exist');
        cy.contains('Edit mes objectif et activité').should('exist');
    });
});