describe("FAQ Page", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/faq");
    });
  
    it("should display the FAQ section", () => {
      cy.get(".text-title-faq").should("have.length", 6);
    });
  
    it("should display the FAQ questions and answers", () => {
      cy.get(".ktq5").should("have.length", 6);
  
      cy.get(".ktq5").eq(0).within(() => {
        cy.contains("Qu'est-ce que Sidekick et en quoi consiste ce projet ?");
        cy.contains(
          "Sidekick est une application qui met en relation deux personnes inconnues afin qu'elles puissent s'entraider pour atteindre leurs objectifs communs, que ce soit dans le domaine du sport et/ou d'un plan alimentaire."
        );
      });
    });
  
    it("should display the contact email", () => {
      cy.get(".text-orange-500").contains("sidekick.eip@gmail.com");
    });
  });
  