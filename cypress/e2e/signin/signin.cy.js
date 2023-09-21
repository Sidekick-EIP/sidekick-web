describe("Signin Component Tests", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/signin");
    });
  
    it("should display the Signin page", () => {
      cy.contains("Connexion !");
      cy.contains("Email");
      cy.contains("Password");
      cy.contains("Login");
    });
  
    it("should allow a user to sign in with valid credentials", () => {
      cy.get('input[name="email"]').type("user@example.com");
      cy.get('input[name="password"]').type("password123");
  
      cy.get('button[type="submit"]').click();
    });
  
    it("should display an error for invalid credentials", () => {
      cy.get('input[name="email"]').type("invalid@example.com");
      cy.get('input[name="password"]').type("invalidpassword");
      cy.get('button[type="submit"]').click();
      cy.url().should('eq', 'http://localhost:3000/signin');
    });
  });