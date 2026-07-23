# Polypous - Frontend

Polypous is a modern, type-safe Client and Invoice Management Dashboard. This directory contains the frontend user interface, built with React 19, Vite, and TypeScript.

---

## 🎯 Purpose & Utility

The frontend provides a minimalist, high-fidelity user interface designed to help freelancers, developers, designers, and agencies manage their financial workflow. It aims to make creating invoices, tracking payments, and viewing financial growth analytics intuitive, responsive, and visually appealing.

## 🚀 Features

- **🔒 Authentication**: Secure login, registration, email verification, and password recovery.
- **📊 Dashboard**: Dynamic widgets, interactive charts, and business metrics overview.
- **📄 Invoices**: Create, edit, and track invoice statuses (draft, sent, paid, overdue).
- **👥 Client Management**: Manage clients, view client histories, and track client-specific invoicing.
- **💳 Payments**: Record and monitor incoming payments and transactions.
- **📈 Analytics**: Rich data visualization using Recharts.
- **⚙️ Settings**: Account customization, system preferences, and application settings.

---

## 🛠️ Tech Stack

- **Core**: React 19, TypeScript, Vite
- **Routing**: [TanStack Router](https://tanstack.com/router) (fully type-safe routing)
- **Data Fetching**: [TanStack Query](https://tanstack.com/query) (React Query)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Styling**: Tailwind CSS v4, Radix UI (Headless components)
- **Forms & Validation**: React Hook Form, Zod
- **Icons**: Hugeicons, Lucide React

---

## 📦 Getting Started

### Prerequisites

Ensure you have **Node.js** (v18+ recommended) and **npm** installed.

### Installation

Clone the repository and install dependencies:

```bash
cd frontend
npm install
```

### Development

Start the local development server:

```bash
npm run start:dev
```

### Build

Compile the production-ready build:

```bash
npm run build
```

---

## 📁 Project Structure

```text
src/
├── assets/          # Static assets (images, logos, icons)
├── components/      # Shared UI and layout components
├── context/         # React context providers
├── features/        # Feature-specific logic & components (auth, invoices, etc.)
├── hooks/           # Custom React hooks
├── lib/             # Utility library integrations (axios, queryClient)
├── routes/          # TanStack file-based routes
├── types/           # Global TypeScript type definitions
└── utils/           # Helper/utility functions
```
