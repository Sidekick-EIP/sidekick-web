describe('Signin Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/signin'); 
  });

  it('should render the Signin page with input fields', () => {
    cy.get('h1').should('contain.text', 'Fill your credentials an');
    cy.get('h2 span').should('contain.text', 'LogIn');
    cy.get('label').should('contain.text', 'Email address');
    cy.get('input[type="email"]').should('exist');
    cy.get('label').should('contain.text', 'Password');
    cy.get('input[type="password"]').should('exist');
    cy.get('button').should('contain.text', 'Login');
    cy.get('a[href="/forget_password"]').should('exist');
  });
});

describe('Signin Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/signin'); 
  });

  it('should submit the form with valid credentials', () => {
    cy.get('input[type="email"]').type('fit@tips.com');
    cy.get('input[type="password"]').type('@Bonjour1');
    cy.get('.flex-row').click();
  });
});

describe('Signin Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/signin'); 
  });

  it('should navigate to forget password page when "Missing password?" link is clicked', () => {
    cy.get('a[href="/forget_password"]').click();
    cy.url().should('include', '/forget_password');
  });
});