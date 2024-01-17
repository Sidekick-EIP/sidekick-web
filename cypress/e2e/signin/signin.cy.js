describe('Signin Page', () => {
  beforeEach(() => {
    cy.visit('/signin'); 
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

// cypress/integration/signin.spec.js

describe('Signin Page', () => {
  beforeEach(() => {
    cy.visit('/signin'); 
  });

  it('should submit the form with valid credentials', () => {
    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').type('password123');
    cy.get('button').click();
    cy.url().should('not.include', '/signin'); // Assuming successful login redirects to another page
  });
});

// cypress/integration/signin.spec.js

describe('Signin Page', () => {
  beforeEach(() => {
    cy.visit('/signin'); 
  });

  it('should display loading spinner during form submission', () => {
    cy.intercept('POST', '/api/auth/signin', {}).as('signinRequest');

    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').type('password123');
    cy.get('button').click();

    cy.wait('@signinRequest');
    cy.get('button').should('contain.text', 'Login');
  });
});

// cypress/integration/signin.spec.js

describe('Signin Page', () => {
  beforeEach(() => {
    cy.visit('/signin'); 
  });

  it('should navigate to forget password page when "Missing password?" link is clicked', () => {
    cy.get('a[href="/forget_password"]').click();
    cy.url().should('include', '/forget_password');
  });
});

// cypress/integration/signin.spec.js

describe('Signin Page', () => {
  beforeEach(() => {
    cy.visit('/signin'); 
  });

  it('should redirect to home page if the user is already logged in', () => {
    // Simulate a logged-in user
    cy.intercept('GET', '/api/auth/session', { fixture: 'logged-in-user.json' });

    // Reload the page
    cy.reload();

    // Assert the redirection
    cy.url().should('not.include', '/signin');
    cy.url().should('include', '/');
  });
});
