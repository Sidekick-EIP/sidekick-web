describe("Signin Component Tests", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/signin");
    });
  
    it("should display the Signin page", () => {
      cy.contains("LogIn");
      cy.contains("Fill your credentials an");
      cy.contains("Login");
    });
  
    it("should allow a user to sign in with valid credentials", () => {
      cy.get(':nth-child(1) > .relative > .py-3').type("user@example.com");
      cy.get(':nth-child(2) > .relative > .py-3').type("password123");
      cy.get('.flex-col > .MuiButtonBase-root').click();
    });
  
    it("should display an error for invalid credentials", () => {
      cy.get(':nth-child(1) > .relative > .py-3').type("invalid@example.com");
      cy.get(':nth-child(2) > .relative > .py-3').type("invalidpassword");
      cy.get('.flex-col > .MuiButtonBase-root').click();
      cy.url().should('eq', 'http://localhost:3000/signin');
    });
  });