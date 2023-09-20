describe("Sports Component Tests", () => {
    beforeEach(() => {
      cy.visit("/signup/sports");
    });
  
    it("should display the Infos page", () => {
      cy.contains("Inscription !");
      cy.contains("Poids");
      cy.contains("Sport frequency (per week)");
      cy.contains("Genre");
      cy.contains("Objectif");
    });
  
    it("should allow a user to fill in and submit the infos form", () => {
      cy.get('input[name="weight"]').type("76");
  
      cy.get('select[name="sport_frequence"]').select("TWICE_A_WEEK");
      cy.get('select[name="gender"]').select("MALE");
      cy.get('select[name="goal"]').select("WEIGHT_LOSS");
  
      cy.get('button[type="submit"]').click();
  
      cy.url().should("eq", "http://localhost:3000/");
    });
  
    it("should display validation errors for required fields", () => {
      cy.get('button[type="submit"]').click();
  
      cy.contains("Weight is required");
      cy.contains("Sport frequency is required");
      cy.contains("Gender is required");
      cy.contains("Goal is required");
    });
});
  