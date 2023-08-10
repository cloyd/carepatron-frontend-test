/// <reference types="cypress" />
import mockClients from '../fixtures/clients.json';
import newClient from '../fixtures/new-client.json';

const API_URL = 'http://localhost:5044';

describe('Main components', () => {
	it('should render main components', () => {
		cy.visit('/');

		cy.get('h4').should('contain.text', 'Clients');
		cy.get('[data-testid="search-input"]').should('exist').and('have.attr', 'type').and('eq', 'search');
		cy.get('[data-testid="create-client-button"]').should('exist').and('contain.text', 'Create Client');
		cy.get('[data-testid="client-list"]').should('exist');
	});
});

describe('Clients features', () => {
	beforeEach(() => {
		cy.intercept('GET', `${API_URL}/clients`, {
			fixture: 'clients.json',
		}).as('getClients');
		cy.visit('/');

		cy.get('[data-testid="client-list"] table').as('list');
		cy.get('[data-testid="create-client-button"]').as('createButton');
		cy.get('[data-testid="search-input"]').as('searchInput');
	});

	context('Client List Component', () => {
		it('should display correct columns', () => {
			cy.get('@list').find('thead th').should('have.length', 3);
			cy.get('@list').find('thead th').eq(0).should('contain.text', 'Name');
			cy.get('@list').find('thead th').eq(1).should('contain.text', 'Phone number');
			cy.get('@list').find('thead th').eq(2).should('contain.text', 'Email');
		});

		it('should display a loading indicator (Skeleton) while waiting for an API request ', () => {
			cy.get('@list').find('span.MuiSkeleton-root').should('exist');
		});

		it('should display a list of clients', () => {
			cy.wait('@getClients');

			const mockClient = mockClients[0];
			cy.get('@list')
				.find('tbody tr th')
				.should('contain.text', `${mockClient.firstName} ${mockClient.lastName}`);
			cy.get('@list').find('tbody tr td').eq(0).should('contain.text', mockClient.phoneNumber);
			cy.get('@list').find('tbody tr td').eq(1).should('contain.text', mockClient.email);
		});
	});

	context('Client Search Component', () => {
		it('should filter the client list on search input', () => {
			cy.get('@searchInput').type('steven');

			cy.get('@list').should('contain', 'John Stevens');
			cy.get('@list').should('contain', 'Steven Smith');
		});

		it('John Stevens should show up if a user searches "john"', () => {
			cy.get('@searchInput').type('john');

			cy.get('@list').should('contain', 'John Stevens');
			cy.get('@list').should('not.contain', 'Steven Smith');
		});
	});

	context('Create New Client', () => {
		it('should create a new client and then search for them', () => {
			cy.intercept('POST', `${API_URL}/clients`, {
				fixture: 'new-client.json',
			}).as('addClients');

			cy.intercept('GET', `${API_URL}/clients`, {
				fixture: 'with-new-client.json',
			}).as('getClients');

			cy.visit('/');
			cy.get('@createButton').click();

			// Fill in the form fields
			cy.get('[data-testid="first-name-input"]').type(newClient.firstName);
			cy.get('[data-testid="last-name-input"]').type(newClient.lastName);

			cy.get('[data-testid="submit-client-button"]').as('submitButton');

			cy.get('@submitButton').click();

			cy.get('[data-testid="email-input"]').type(newClient.email);
			cy.get('[data-testid="phone-number-input"]').type(newClient.phoneNumber);
			cy.get('@submitButton').click();

			cy.wait('@addClients');

			cy.get('[role="presentation"].MuiSnackbar-root')
				.should('exist')
				.should('contain', 'Successfully added new client');

			cy.get('@searchInput').type('Cloyd');

			// Check if the client list contains the expected results
			cy.get('@list').should('contain', 'Cloyd Bilog');
		});

		it('should go back to personal details when back button is click', () => {
			cy.visit('/');
			cy.get('@createButton').click();

			cy.get('[data-testid="first-name-input"]').type('lorem');
			cy.get('[data-testid="last-name-input"]').type('ipsum');

			cy.get('[data-testid="submit-client-button"]').as('submitButton');

			cy.get('@submitButton').click();

			cy.get('[data-testid="first-name-input"]').should('not.exist');

			cy.get('button').contains('Back').click();
			cy.get('[data-testid="first-name-input"]').should('exist');
			cy.get('button').contains('Back').should('not.exist');
		});

		it('should change the submit button label from next to submit when in contact details step', () => {
			cy.visit('/');
			cy.get('@createButton').click();
			cy.get('[data-testid="submit-client-button"]').as('submitButton');

			cy.get('@submitButton').should('contain.text', 'Next');

			cy.get('[data-testid="first-name-input"]').type('lorem');
			cy.get('[data-testid="last-name-input"]').type('ipsum');

			cy.get('@submitButton').click();

			cy.get('@submitButton').should('contain.text', 'Create client');
		});

		context('form validations', () => {
			it('should display validation errors for empty form fields', () => {
				cy.get('@createButton').click();
				cy.get('[data-testid="submit-client-button"]').as('submitButton');

				// Submit the form without filling in any fields
				cy.get('@submitButton').click();

				// Check validation error messages for all fields
				cy.contains('First name is required');
				cy.contains('Last name is required');

				cy.get('[data-testid="first-name-input"]').type(newClient.firstName);
				cy.get('[data-testid="last-name-input"]').type(newClient.lastName);
				cy.get('@submitButton').click();

				cy.get('@submitButton').click();

				cy.contains('Email is required');
				cy.contains('Phone number is required');
			});

			it('should display validation error for invalid email format', () => {
				cy.get('@createButton').click();
				cy.get('[data-testid="submit-client-button"]').as('submitButton');

				// Fill in the form fields with invalid email
				cy.get('[data-testid="first-name-input"]').type('John');
				cy.get('[data-testid="last-name-input"]').type('Doe');
				cy.get('@submitButton').click();

				cy.get('[data-testid="email-input"]').type('invalid-email');
				cy.get('[data-testid="phone-number-input"]').type('1234567890');
				cy.get('@submitButton').click();

				// Check validation error message for email
				cy.contains('Invalid email address');
			});

			it('should validate whitespaces', () => {
				cy.get('@createButton').click();
				cy.get('[data-testid="submit-client-button"]').as('submitButton');

				cy.get('[data-testid="first-name-input"]').type('       ');
				cy.get('[data-testid="last-name-input"]').type('Doe');

				cy.get('@submitButton').click();

				cy.contains('First name is required');
			});

			it.only('should display validation error for invalid phone number format', () => {
				cy.get('@createButton').click();
				cy.get('[data-testid="submit-client-button"]').as('submitButton');

				cy.get('[data-testid="first-name-input"]').type('Lorem');
				cy.get('[data-testid="last-name-input"]').type('Doe');

				cy.get('@submitButton').click();

				cy.get('[data-testid="email-input"]').type('lorem.ipsum@example.com');
				cy.get('[data-testid="phone-number-input"]').type('invalidnumber912837');

				cy.get('@submitButton').click();

				cy.contains('Invalid phone number format');
			});
		});
	});
});
