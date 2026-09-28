# ExpenseTrack

ExpenseTrack is a full-stack personal expense management web application that allows users to record, organize, update, and monitor their daily expenses.

The application provides a secure authentication system, expense and category management, dashboard summaries, protected routes, and a responsive user interface.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Application Workflow](#application-workflow)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Database Design](#database-design)
- [API Documentation](#api-documentation)
- [Authentication](#authentication)
- [Frontend](#frontend)
- [Backend](#backend)
- [Validation and Error Handling](#validation-and-error-handling)
- [Loading States](#loading-states)
- [Environment Variables](#environment-variables)
- [Installation and Setup](#installation-and-setup)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [Security](#security)
- [Future Improvements](#future-improvements)
- [Learning Outcomes](#learning-outcomes)
- [Deployment](#deployment)
- [Author](#author)

---

# Project Overview

Managing daily expenses manually can make it difficult to understand spending patterns and maintain organized financial records.

ExpenseTrack provides a simple web-based solution where users can:

- Create an account
- Login securely
- Add personal expenses
- Categorize expenses
- View all expenses
- Edit existing expenses
- Delete expenses
- Create and manage expense categories
- View total expenses
- View current month's expenses
- View the total number of expense records

The application follows a full-stack architecture where the React frontend communicates with a Node.js/Express backend through REST APIs.

---

# Features

## 1. User Registration

New users can create an account by providing:

- Name
- Email
- Password
- Confirm Password

The application validates the input before sending the registration request to the backend.

---

## 2. User Login

Registered users can login using:

- Email
- Password

After successful authentication, the backend returns a JWT token.

The frontend stores the authentication information and allows the user to access protected resources.

---

## 3. Logout

Users can logout from the dashboard.

During logout:

- JWT token is removed from localStorage
- User information is removed from localStorage
- User is redirected to the login page

---

## 4. Protected Routes

ExpenseTrack uses protected frontend routes.

The following pages require authentication:

```text
/dashboard
/expenses
/expenses/new
/expenses/:id/edit
/categories
