# Overview

BookMart is a full-stack educational book ordering system built with React, Express, and PostgreSQL. The application allows customers to browse educational books by grade level (1-9), add items to a shopping cart, and place orders for educational materials. The system uses an in-memory storage fallback with sample data and includes email notifications for order processing.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent design
- **State Management**: React Context for cart functionality, TanStack Query for server state
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation

## Backend Architecture
- **Runtime**: Node.js with Express.js REST API
- **Database Layer**: Drizzle ORM configured for PostgreSQL with Neon serverless driver
- **Storage Pattern**: Interface-based storage with in-memory fallback implementation
- **API Design**: RESTful endpoints for books and orders with proper error handling
- **Development**: Hot module reloading with Vite integration

## Database Design
- **Books Table**: Stores educational materials with grade levels, pricing, and descriptions
- **Orders Table**: Customer information and order details with JSON-serialized cart items
- **Schema Validation**: Drizzle-Zod integration for type-safe database operations

## Key Features
- **Grade-based Filtering**: Books categorized by educational grade levels (1-9)
- **Shopping Cart**: Persistent cart state with quantity management
- **Order Processing**: Form-based checkout with customer details collection
- **Email Notifications**: Automated order confirmations sent to administrators
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## Development Workflow
- **Type Safety**: Full TypeScript coverage across frontend, backend, and shared schemas
- **Code Organization**: Monorepo structure with shared types and schemas
- **Hot Reloading**: Development server with instant updates
- **Build Process**: Separate client and server builds for production deployment

# External Dependencies

## Database Services
- **Neon Database**: Serverless PostgreSQL hosting with connection pooling
- **Drizzle Kit**: Database migration and schema management tools

## Email Services
- **Nodemailer**: SMTP email delivery for order notifications
- **Gmail Integration**: Configured for Google Apps password authentication

## UI Components
- **Radix UI**: Accessible component primitives for consistent interactions
- **Lucide React**: Icon library for user interface elements
- **Tailwind CSS**: Utility-first styling framework

## Development Tools
- **Vite**: Fast development server and build tool with React plugin
- **TypeScript**: Type checking and development experience enhancement
- **ESBuild**: Fast JavaScript bundling for production builds

## Third-party Services
- **Unsplash**: External image hosting for book cover placeholder images
- **TanStack Query**: Server state management and caching layer
- **Date-fns**: Date manipulation and formatting utilities