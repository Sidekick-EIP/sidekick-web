describe('Page Load', () => {
    it('should load the page successfully', () => {
        cy.visit('http://localhost:3000/');
        cy.contains('Ensemble, allons plus loin !').should('be.visible');
    });
});

describe('Heading Content', () => {
    it('should have the correct main heading', () => {
        cy.visit('http://localhost:3000/');
        cy.contains('Sidekick c’est la fusion d’une application de nutrition et d’exercices sportifs complets avec un espace de rencontre entre passionnés pour rester motivé.').should('be.visible');
    });
});

describe('Android App Link', () => {
    it('should have a valid Android app download link', () => {
        cy.visit('http://localhost:3000/');
        cy.get('a[href="/app-release.apk"]').should('have.attr', 'href', '/app-release.apk');
    });
});

describe('iOS App Link', () => {
    it('should have a valid iOS app download link', () => {
        cy.visit('http://localhost:3000/');
        cy.get('a[href="/"]').should('have.attr', 'href', '/');
    });
});

describe('Main Image Display', () => {
    it('should display the main image', () => {
        cy.visit('http://localhost:3000/');
        cy.get(':nth-child(1) > .container > .py-6 > .w-full')
    });
});