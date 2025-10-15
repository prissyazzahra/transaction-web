# Transaction Web

A simple React web app that simulates **bank account management**, allowing users to create new accounts, retrieve balances, and transfer funds between accounts.

---

## Features

- Create an account with an initial balance  
- Retrieve an account’s balance by ID  
- Transfer funds between accounts
- Simple, responsive UI with included form validation using Ant Design and SCSS
- Built with React 19 + Vite for a fast development experience  

---

## Tech Stack

| Purpose | Technology |
|----------|-------------|
| Framework | React 19 |
| UI Library | Ant Design |
| Styling | SCSS |
| HTTP Client | Axios |
| Build Tool | Vite |

---

## Assumptions

- Balances use **SGD (Singapore Dollars)**  
- API requests are proxied to `/api` (see `vite.config.ts`) for security
- Maximum 17 digit initial balance for account creation
- Account ID uses randomly generated 3 digit number

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run development server
```bash
npm run dev
```
Then open `localhost:5137`. Please make sure your **backend is running** before starting the project.

## Folder Structure
src/

 ├── hooks/ &nbsp;&nbsp;&nbsp;&nbsp;# Custom hooks
 
 ├── utils/ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Utility functions (formatter)
 
 ├── types/ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Custom typing
 
 ├── styles/ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# SCSS for styling
 
 ├── App.tsx &nbsp;&nbsp;&nbsp;&nbsp;# App component
 
 └── main.tsx &nbsp;&nbsp;&nbsp;# Entrypoint
 



