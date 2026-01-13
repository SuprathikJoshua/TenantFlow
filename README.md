# TenantFlow

TenantFlow is a **production-grade multi-tenant SaaS platform** designed to help organizations manage teams, users, and internal resources securely at scale.

The system is built with a **clean separation of concerns**, where the backend enforces authentication, authorization, and data isolation, and the frontend focuses on delivering a role-aware user experience.

---

## 🚀 Key Features

- Multi-tenant architecture with strict organization-level data isolation
- Role-Based Access Control (Owner, Admin, Member)
- Secure authentication using JWT
- Centralized error handling and standardized API responses
- Modern frontend built with Next.js and TypeScript

---

## 🧱 Architecture Overview

```
Browser
  ↓
Next.js Frontend (TypeScript)
  ↓
TenantFlow Backend (Node.js + Express + TypeScript)
  ↓
Database
```

---

## 🛠 Tech Stack

### Backend
- Node.js
- TypeScript
- Express.js
- PostgreSQL
- Prisma ORM
- JWT Authentication

### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- TanStack Query

---

## 📂 Project Structure

```
TenantFlow/
├── packages/
│   ├── backend/
│   └── frontend/
├── docs/
│   ├── PRD_Backend_TenantFlow.md
│   └── PRD_Frontend_TenantFlow.md
└── README.md
```

---

## 📄 Documentation

- **Backend PRD** – Detailed requirements and architecture for the backend service
- **Frontend PRD** – UI, UX, and integration requirements for the frontend

---

## 🎯 Project Goals

- Enable secure team management for multiple organizations
- Prevent cross-tenant data access by design
- Demonstrate production-level backend engineering practices

---

## 🧠 Why TenantFlow

TenantFlow mirrors real-world SaaS systems such as Slack and GitHub, focusing on correctness, security, and scalability rather than superficial features.

---

## 📌 Status

🚧 In active development

---

## 👤 Author

**Suprathik Joshua**

---

