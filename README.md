# Carepatron Frontend Test

This project is a client management application built using React and various libraries. It allows users to create clients and search for clients.

## Table of Contents

- [Requirements](#requirements)
- [Getting Started](#getting-started)
- [What I Added](#what-i-added)
- [End-to-end Testing](#cypress-tests)
- [Deployment](#deployment)

## Requirements

1.  Create a Client

- All fields are required.

2.  Search for a Client

- Searching in the "search field" filters the list of clients by their first or last name.
- Example: "John Stevens" and "Steven Smith" should both show up if a user searches "steven."
- Example: "John Stevens" should show up if a user searches "john."

## What I Added

In addition to the provided tech stack, I have integrated the following technologies:

- Zod for validation
- React Hook Form for form management
- React Query for server state management
- Cypress for end-to-end testing

## Getting Started

To run the application locally, follow these steps:

1. In a new terminal, navigate to the `/mock-api/` directory:

```sh
   cd mock-api/
```

2. Install dependencies and start the mock API server:

```sh
  npm install
  npm run build
  npm start
```

3. In another terminal, navigate to the /ui/ directory:

```sh
  cd ui/
```

4. Install dependencies and start the UI:

```sh
  npm install
  npm start
```

## End-to-end Testing

I have included Cypress tests to cover various aspects of the application, including form validation, search functionality, and client creation. The following tests have been covered:

- Main components

  ✅ should render main components

- Clients features

  - Client List Component
    ✅ should display correct columns

    ✅ should display a loading indicator (Skeleton) while waiting for an API request

    ✅ should display a list of clients

  - Client Search Component

    ✅ should filter the client list on search input

    ✅ John Stevens should show up if a user searches "john"

  - Create New Client

    ✅ should create a new client and then search for them

    ✅ should go back to personal details when back button is click

    ✅ should change the submit button label from next to submit when in contact details step
    form validations

    ✅ should display validation errors for empty form fields

    ✅ should display validation error for invalid email format

    ✅ should validate whitespaces

To run end to end testing

```sh
  npm run test:open
```

## Deployment

The application has been deployed using Vercel. You can access the live demo of the application at the following links:

Frontend: https://carepatron-frontend-test.vercel.app/

Mock API: https://carepatron-test-mock-api.vercel.app/

# [Visit the wiki](https://github.com/Carepatron/Carepatron-Test-Full/wiki)
