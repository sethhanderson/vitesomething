Landing page development

Create the marketing landing page with information about your product
Include a prominent "Sign Up" and "Login" buttons
This page should be publicly accessible and not require authentication


Design system basics

Establish color palette, typography, and component styles
Create reusable UI components (buttons, forms, cards)


Authentication UI

Create sign-up form with email validation
Create login form with error handling
Design password reset flow


Authentication API integration

Set up API communication service
Implement token management (storage, refresh, expiration)
Create middleware for API authentication


Route protection mechanism

Set up protected routes
Create authentication context to track user state
Implement redirect logic for unauthenticated users


Technical Implementation Guidelines
Landing Page & Authentication Flow

Single application approach: Keep landing page and app in the same React project

Use route-based separation rather than separate projects
This simplifies the authentication flow


Authentication strategy:

Use JWT tokens stored in localStorage/sessionStorage
Create a central auth context that wraps your application
Protected routes should check this auth context


Route protection:

All routes outside of landing, login, signup pages should be protected
Use React Router's route configuration with authentication guards
Implement redirect logic that returns users to login page

roject Structure Approach
For a React/TypeScript application with authentication requirements, you'll typically want a single project that includes:

Frontend (React/TypeScript with Vite)
Backend (Python)
Authentication flow that prevents unauthorized access

You can absolutely work on all of these components within the same VS Code project, even though they're separate codebases.
Authentication Flow
The authentication flow you're describing is standard:

User visits landing page
User creates an account/logs in
Only after authentication can they access the actual product

This is implemented through:

Route protection on the frontend
API authentication on the backend

You don't need a separate project for the landing page - it's just the entry point to your application.
