describe('Home Page', () => {
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

    it('should open the dialog for editing personal information', () => {
        cy.get('button').contains('Edit information personnel').click();
        cy.get('[role="dialog"]').should('exist');
        cy.get('[role="dialog"] [aria-label="Close"]').click();
    });

    it('should open the dialog for editing sports goals and activities', () => {
        cy.get('button').contains('Edit mes objectif et activité').click();
        cy.get('[role="dialog"]').should('exist');
        cy.get('[role="dialog"] [aria-label="Close"]').click();
    });

    it('should reload user information after closing the edit dialog', () => {
        cy.get('button').contains('Edit information personnel').click();
        cy.get('[role="dialog"] [aria-label="Close"]').click();
        cy.get('img[alt="background"]').should('exist');
        cy.get('h5').should('exist');
    });

    it('should navigate to the user\'s goal page when clicking on an activity', () => {
        cy.get('[role="dialog"] [aria-label="Close"]').click(); // Close the dialog if open
        cy.get('div[role="gridcell"]').first().click();
        cy.url().should('include', '/goal');
    });
});