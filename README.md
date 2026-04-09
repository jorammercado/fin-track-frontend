# 📈 FinTrack Frontend – Financial Insights and Tracking Application

_A comprehensive platform for managing income, expenses, and investments with real‑time market data._

[<img src="./public/images/home.png" height="185px" alt="Home Screenshot">](https://fintrackpro.netlify.app/)

## 🧭 Overview

This project integrates a wide range of technologies and concepts to simulate a professional, production‑grade financial management platform. FinTrack is a full‑stack financial management application that allows users to monitor income, expenses, and investment accounts. Transactions can be added, categorized, and analyzed through detailed tables and dynamic D3‑based visualizations. The app also integrates live stock prices and market news to provide a holistic view of financial performance.

This project demonstrates secure session handling, authentication, modular frontend architecture, and data‑driven visualization — key competencies for building robust web applications.

## 📚 Table of Contents

- [🧰 Tech Stack](#-tech-stack)
- [🚀 Deployment](#-deployment)
- [🗂 Repositories](#-repositories)
- [👤 Guest Login](#-guest-login)
- [🧾 Pages](#-pages)
- [✅ Features](#-features)
    - [🔐 Session Security](#-session-security)
    - [💸 Transaction Management](#-transaction-management)
    - [📧 Multi‑Factor Authentication](#-multi-factor-authentication)
    - [📄 Pagination](#-pagination)
    - [📈 Stock Price Integration](#-stock-price-integration)
    - [📰 Market News](#-market-news)

- [⚙️ Getting Started](#-getting-started)
- [📄 License](#-license)
- [👤 Contact](#-contact)

## 🧰 Tech Stack

**Frontend:** React, SCSS (BEM), D3.js, Bootstrap, styled‑components
**Backend:** Node.js, Express
**Database:** PostgreSQL
**APIs:** Polygon.io (stock data), Finnhub.io (market news)
**Authentication:** JWT, bcrypt
**Session Management:** JWT lifecycle controlled with `jwt-decode`

## 🚀 Deployment

**Frontend:** [fintrackpro.netlify.app](https://fintrackpro.netlify.app/)
**Backend:** [fintrack-backend-services.onrender.com](https://fintrack-backend-services.onrender.com/)

## 🗂 Repositories

- **Frontend:** [github.com/jorammercado/fin-track-frontend](https://github.com/jorammercado/fin-track-frontend)
- **Backend:** [github.com/jorammercado/fin-track-backend](https://github.com/jorammercado/fin-track-backend)

## 👤 Guest Login

A **Guest Login** option lets visitors explore all major features using preloaded sample data for checking, savings, and investment accounts. Guests can:

- Interact with the transactions table and graph
- View stock data and news feeds
- Navigate profile and account pages without affecting real user data

This feature demonstrates full functionality while maintaining security and data isolation.

## 🧾 Pages

- **Home:** Overview and feature highlights.
- **Login / Sign Up:** Secure authentication.
- **Verify OTP:** Email‑based verification during login.
- **Profile / Edit Account / Edit Password:** Manage user settings.
- **Dashboard:** Summarized account balances.
- **Transactions:** Interactive table and graph views.
- **Investments:** Real‑time stock data.
- **Market News:** Aggregated financial headlines.
- **404:** Custom error page.

## ✅ Features

### 🔐 Session Security

JWT‑based authentication manages login state securely:

- Tokens expire after 30 minutes and are purged from localStorage on logout or timeout.
- Protected and Public routes restrict access contextually.
- The navigation bar dynamically adjusts based on authentication status.
- All sensitive data is fetched only after backend verification.

```javascript
// Simplified example: Protected Route
const ProtectedRoute = ({ element: Component }) => {
    const token = localStorage.getItem('authToken')
    return token ? <Component /> : <Navigate to="/login" />
}
```

Session expiry triggers automatic logout, ensuring secure lifecycle management.

### 💸 Transaction Management

#### 📊 Transactions Table

Displays categorized financial activity with sortable, filterable columns and responsive design.

```javascript
const handleSortAmount = () => {
    const sorted = [...allTransactions].sort((a, b) =>
        amountOrder ? b.amount - a.amount : a.amount - b.amount
    )
    setAllTransactions(sorted)
    setAmountOrder(!amountOrder)
}
```

Users can add, edit, and delete transactions; balances for checking, savings, and investments update automatically.

#### 📈 Transactions Graph

A D3.js line graph visualizes account balances over time. Interactive features include zoom, brushing, and legend toggling:

- **Legend:** Toggle visibility of individual accounts.
- **Brushing:** Drag to zoom into specific ranges.

This visualization provides immediate insight into financial trends and behavior.

### 📧 Multi‑Factor Authentication (MFA)

Implements email‑based OTP verification after successful password validation.

```javascript
const otp = Math.floor(100000 + Math.random() * 900000).toString()
const hashedOtp = await bcrypt.hash(otp, 10)
await updateAccountMFAOneTimePassword(account_id, hashedOtp, expirationTime)
```

This ensures only verified users can access session tokens, enhancing security beyond standard login.

### 📄 Pagination

Pagination improves performance by limiting transactions displayed per page.

```javascript
const indexOfLast = currentPage * postsPerPage
const currentPosts = allTransactions.slice(indexOfFirst, indexOfLast)
```

A reusable Pagination component handles page switching across views.

### 📈 Stock Price Integration

Uses Polygon.io API to fetch and display real‑time stock data.

```javascript
const fetchStockData = async (symbol) => {
    const res = await axios.get(`${API_URL}/stocks/${symbol}`)
    setStockData(res.data)
}
```

Data is refreshed dynamically to keep market information current.

### 📰 Market News

Integrates Finnhub.io API for live financial news headlines.

```javascript
const fetchNews = async () => {
    const res = await axios.get(`${API_URL}/news/latest`)
    setNews(res.data)
}
```

Provides users with up‑to‑date insights directly within the dashboard.

## ⚙️ Getting Started

1. Clone both frontend and backend repositories.
2. Install dependencies:

    ```bash
    npm install
    ```

3. Configure environment variables (API keys, database URL, JWT secret).
4. Run both servers:

    ```bash
    npm run dev
    ```

5. Visit the frontend URL displayed in the terminal.

## 📄 License

[MIT License](https://opensource.org/license/mit)

## 👤 Contact

**Joram Mercado**
[GitHub](https://github.com/jorammercado) | [LinkedIn](https://www.linkedin.com/in/jorammercado)
