
# 311 San Jose (React + TypeScript + Vite)

This project is a React application built with TypeScript and Vite.

---

## 📦 Prerequisites

Make sure you have the following installed:


* **Node.js** (recommended: v22.16.0)
* **npm** or **yarn** (recommended: 10.7.0)
* **React** (recommended: 19.2.14)

Check versions:

```bash
node -v
npm -v
```

---

## 📁 Project Setup

### 1. Install dependencies

Using npm:

```bash
npm install
```

Or using yarn:

```bash
yarn install
```

---

## 🚀 Available Scripts

### 🔧 Start development server

```bash
npm run dev
```

Runs the app in development mode using Vite.
Open: [http://localhost:5173](http://localhost:5173)

---

### 🏗️ Build for production

```bash
npm run build
```

This command:

* Runs TypeScript type checking (`tsc -b`)
* Builds optimized production bundle using Vite

Output will be in the `dist/` folder.

---

### 👀 Preview production build

```bash
npm run preview
```

Locally preview the production build.

---

### 🧹 Lint code

```bash
npm run lint
```

Runs ESLint across the project to find code issues.

---

## 📦 Installed Dependencies

### Core dependencies

```json
react
react-dom
```

---

### Dev dependencies

#### Build & tooling

* vite – Fast frontend build tool
* @vitejs/plugin-react – React support for Vite
* typescript – Type checking

#### Linting

* eslint – Linting engine
* @eslint/js – ESLint JS config
* typescript-eslint – TypeScript ESLint support
* eslint-plugin-react-hooks – React hooks rules
* eslint-plugin-react-refresh – Fast refresh safety rules

#### Babel / compilation

* @babel/core
* babel-plugin-react-compiler
* @rolldown/plugin-babel

#### Types

* @types/react
* @types/react-dom
* @types/node
* @types/babel__core

#### Utilities

* globals – Global variables definitions

---

## 🏗️ Project Structure (typical)

```
src/
  assets/
  components/
  App.tsx
  main.tsx
index.html
vite.config.ts
tsconfig.json
```

---

## ⚙️ Tech Stack

* React 19
* TypeScript 6
* Vite 8
* ESLint 9

---
