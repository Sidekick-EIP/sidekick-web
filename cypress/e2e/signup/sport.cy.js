describe("Sports Component Tests", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/signup/sport");
    });
  
    it("should display the Infos page", () => {
      cy.contains("Inscription !");
      cy.contains("Poids");
      cy.contains("Sport frequency (per week)");
      cy.contains("Genre");
      cy.contains("Objectif");
    });   
  
    it("should display validation errors for required fields", () => {
      cy.get('button[type="submit"]').click();
      cy.contains("Un poids est requis.");
      cy.contains("Une reponse est requise.");
      cy.contains("Un objectif est requis.");
      cy.contains("Une frequence est requise.");
    });
});
  