describe("Email Component Tests", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/signup");
    });
  
    it("should display the Email page", () => {
      cy.contains("Inscription !");
      cy.contains("Email");
      cy.contains("Password");
      cy.contains("Confirm password");
    });
  
    it("should allow a user to fill in and submit the email form", () => {
      cy.get('input[name="email"]').type("user@example.com");
      cy.get('input[name="password"]').type("password123");
      cy.get('input[name="confirmPassword"]').type("password123");

      cy.get('button[type="submit"]').click();
    });
  
    it("should display an error for invalid email format", () => {
      cy.get('input[name="email"]').type("invalid-email");

      cy.get('button[type="submit"]').click();
  
      // Assert that an error message is displayed (modify this as needed)
      cy.contains("Invalid email format");
    });
  });
  