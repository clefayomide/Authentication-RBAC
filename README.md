# Authentication System with Role-Based Access Control (RBAC)

## Overview
This project implements an authentication system with Role-Based Access Control (RBAC) using sessions and cookies. The system is designed to manage user authentication, authorization, and session management in a secure and scalable manner.

## Technologies Used
- **Node.js**: JavaScript runtime for building the server-side application.
- **Express.js**: Web framework for handling HTTP requests and routing.
- **MySQL**: Relational Database Management System
- **TypeScript**: Superset of JavaScript that adds static types to enhance development.
- **Prisma ORM**: Database ORM for managing database query, schema, access and relationships.
- **Passport.js + Passport Local Strategy**: Middleware for authentication.

## Features
- **User Registration & Login**: Users can register and log in using their email and password.
- **Session-Based Authentication**: Secure user authentication using sessions and cookies.
- **Role-Based Access Control**: Assign role & permissions to users and control access to different routes based on role & permissions.
- **Password Salting & Hashing**: User passwords are securely stored using hashing algorithms.
- **Session Management**: Efficient session management with secure cookie handling.
- **Error Handling**: Comprehensive error handling for common issues like invalid credentials and insufficient permissions.
- **Scalable Architecture**: Adopted the MVC structural pattern for better separation of concerns. Included a service layer which the controller interfaces with to ensure effective delegation of business logic. Another pattern used is the factory creational pattern for dynamic object generation and logic encapsulation.

## Project Structure
```bash
src/
│
├── config/            # Configuration files (e.g., environment variables)
├── connection/        # Database connection setup and configuration
├── constants/         # Constants used throughout the application
├── controller/        # Handles HTTP requests and responses and delegate responsibilities to the service layer
├── factory/           # Factory functions or classes for creating instances
├── lib/               # Custom libraries or utility classes
├── middleware/        # Middleware functions for request processing
├── model/             # Entity models representing database tables and structures
├── route/             # Handles route definition and delegate responsibilties to the controller layer
├── services/          # Business logic and service classes
├── types/             # Type definitions for TypeScript
├── util/              # Utility functions
└── view/              # Handles html templating
```

 
