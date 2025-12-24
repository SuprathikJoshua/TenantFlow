
# Product Requirements Document (PRD)

## TenantFlow Backend

---

## 1. Product Overview

**Product Name:** TenantFlow Backend  
**Version:** 1.0.0  
**Product Type:** Multi-Tenant SaaS Backend (REST API)

TenantFlow Backend is a production-grade, multi-tenant SaaS backend designed to serve multiple organizations from a single system while enforcing strict data isolation, secure authentication, and role-based access control.

---

## 2. Target Users

- Owner – Full control over organization, users, and data
- Admin – Manage users and operational data
- Member – Limited access to company-scoped resources

---

## 3. Core Principles

- Single backend, multiple tenants
- Organization-level data isolation
- Role-based authorization
- Stateless JWT authentication

---

## 4. Core Features

### Authentication & Authorization
- Email/password login
- JWT access and refresh tokens
- Role-Based Access Control (OWNER, ADMIN, MEMBER)

### Organization Management
- Organization onboarding
- Automatic Owner assignment

### User Management
- Invite users
- Assign and update roles
- Remove users

### Task Management
- Create, view, delete organization-scoped tasks

---

## 5. Tech Stack

- Node.js
- TypeScript
- Express.js
- MongoDB
- Mongoose

---

## 6. API Structure

### Auth (`/api/v1/auth`)
- POST `/register-organization`
- POST `/login`
- POST `/refresh-token`
- POST `/logout`

### Users (`/api/v1/users`)
- POST `/`
- GET `/`
- PUT `/:id`
- DELETE `/:id`

### Tasks (`/api/v1/tasks`)
- POST `/`
- GET `/`
- DELETE `/:id`

---

## 7. Data Models

### Organization
```json
{
  "id": "ObjectId",
  "name": "String"
}
```

### User
```json
{
  "id": "ObjectId",
  "email": "String",
  "role": "OWNER | ADMIN | MEMBER",
  "organizationId": "ObjectId"
}
```

### Task
```json
{
  "id": "ObjectId",
  "title": "String",
  "organizationId": "ObjectId"
}
```

---

## 8. Security

- Password hashing
- JWT secret protection
- Authorization middleware

---

## 9. Success Criteria

- No cross-tenant data access
- Stable APIs

---
