# QuickHire Backend API

QuickHire is a mini job board application backend built with Node.js, Express, and Prisma. It provides a RESTful API to manage job listings and job applications.

## Features

- **Job Management**: Create, read, update, and delete job listings.
- **Job Search & Filtering**: Advanced filtering by title, company, location, category, and description using a custom `QueryBuilder`.
- **Application Submission**: Submit job applications with validation for job existence and proper data format (Email, URLs).
- **Validation**: Strict input validation using Zod schemas.
- **Database**: PostgreSQL with Prisma ORM for type-safe database access.

## Tech Stack

- **Node.js**: Runtime environment.
- **Express**: Web framework.
- **Prisma**: ORM for PostgreSQL.
- **TypeScript**: Typed JavaScript.
- **Zod**: Schema validation.
- **PostgreSQL**: Relational database.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- Yarn or npm

### Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/apucsd/quick-hire-backend.git
   cd quick-hire-backend
   ```

2. **Install dependencies**:
   ```bash
   yarn install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory and add the following:
   ```env
   NODE_ENV=development
   PORT=3002
   DATABASE_URL="postgresql://user:password@localhost:5432/quick_hire"
   JWT_ACCESS_SECRET="your-secret"
   JWT_ACCESS_EXPIRES_IN="7d"
   ```

4. **Run Database Migrations & Generate Prisma Client**:
   ```bash
   npx prisma generate
   # If you need to shadow the database and migrate:
   # npx prisma migrate dev
   ```

5. **Start the Development Server**:
   ```bash
   yarn dev
   ```

## API Endpoints

### Jobs
- `GET /api/v1/jobs` - List all jobs (Supports query params: `searchTerm`, `category`, `location`, `page`, `limit`).
- `GET /api/v1/jobs/:id` - Get details of a single job.
- `POST /api/v1/jobs` - Create a new job listing.
- `PATCH /api/v1/jobs/:id` - Update a job listing.
- `DELETE /api/v1/jobs/:id` - Delete a job listing.

### Applications
- `POST /api/v1/applications` - Submit a job application.
- `GET /api/v1/applications/job/:jobId` - Fetch all applications for a specific job.

---
Developed by **apucsd** 🚀
