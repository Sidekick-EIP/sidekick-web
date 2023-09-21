describe("Infos Component Tests", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/signup/infos");
    });
  
    it("should display the Infos page", () => {
      cy.contains("Inscription !");
      cy.contains("Prenom");
      cy.contains("Taille (cm)");
      cy.contains("Nom");
      cy.contains("Date de naissance");
      cy.contains("Description");
      cy.contains("Username");
    });
  
    it("should allow a user to fill in and submit the infos form", () => {
      cy.get('input[name="firstname"]').type("John");
      cy.get('input[name="size"]').type("175");
      cy.get('input[name="lastname"]').type("Doe");
      cy.get('input[name="birth_date"]').type("1990-01-01");
      cy.get('input[name="description"]').type("Description");
      cy.get('input[name="username"]').type("johndoe");
  
      cy.get('button[type="submit"]').click();
    });
  
    it("should display validation errors for required fields", () => {
      cy.get('button[type="submit"]').click();
  
      cy.contains("Un prenom est requis.");
      cy.contains("Une taille est requise.");
      cy.contains("Un nom est requis");
      cy.contains("Une date de naissance est requise.");
      cy.contains("Une description est requise.");
      cy.contains("Un nom d'utilisateur est requis.");
    });
  });
  