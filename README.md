# <img src="./public/logo-icapital.png" height="75px" alt="iCapital Logo">

[<img src="./public/home.png" height="185px" alt="Home Screenshot">](https://icapital-budgeter.netlify.app/)

## Description

The iCapital Budgeter Frontend is part of the Software Engineer Take-Home Exam Project, designed to evaluate fellows' analytical, software development, and problem-solving skills by assessing their ability to design and develop a full-stack application. This project aims to provide insight into the candidate's thought processes, research methods, and approach to solving problems.

The application allows users to track income and expenses by means of logging financial transactions. Among others, using fields such as transaction type and category, users can track three accounts: checking, savings, and investments, as functions of these financial transactions. The application also allows users to view real-time stock prices and analyze stock performance, helping them make more informed investment decisions. The data for the three accounts is graphed in order for users to see trends in their spending and savings patterns.

See [backend repository](https://github.com/jorammercado/icapital-budgeter-backend/blob/main/README.md) for full security features and backend services.

## Contents
- [Tech Stack](#tech-stack)
- [Features](#features)
   - [A. Session Security](#a-session-security)
      - [Route Access Control](#route-access-control)
      - [Example Scenarios](#example-scenarios)
      - [Dynamic Navigation Bar](#dynamic-navigation-bar)
      - [Backend Access](#backend-access)
      - [Session Timeout Management](#session-timeout-management)
         - [User Login and Session Initialization](#user-login-and-session-initialization)
         - [Determining User Login Status](#determining-user-login-status)
         - [User Logout and Timeout Cleanup](#user-logout-and-timeout-cleanup)
   - [B. Transaction Management](#b-transaction-management)
      - [Transactions Table](#transactions-table)
      - [Transactions Graph](#transactions-graph)
   - [C. Stock Price Data Integration](#c-stock-price-data-integration)
   - [D. Market News](#d-market-news)
   - [E. Multi-Factor Authentication](#e-multi-factor-authentication-mfa)
- [Guest Login](#guest-login)
- [Pages](#pages)
- [Deployed Application](#deployed-application)
- [GitHub Repositories](#github-repositories)
- [Getting Started](#getting-started)
- [License](#license)
- [Contact](#contact)


## Tech Stack

- **Frontend**: React, SCSS (BEM), D3, Bootstrap, styled-components
- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **Third Party API**: Polygon.io for real-time stock data
- **Authentication**: JWT (using jwt-decode for session management & security)


## Features

### **A. Session Security**
Session management on the frontend is implemented using a JWT (JSON Web Token) issued by the backend after verifying user credentials. The JWT is securely stored in local storage with an expiration time of 30 minutes. Upon expiration or user logout, the token and general user data are automatically removed from local storage to maintain session security. Sensitive user data such as financial transactions and password are not stored on the frontend. Instead when access is needed, they are retrieved from the backend after verifying the token attached to the request header.

1. #### **Route Access Control**

   Access to routes on the frontend is controlled by wrapping them in either a **Public Route** or a **Protected Route** component:
      - **Public Routes**: Routes such as login and signup pages, accessible only when a user is **not logged in**, example code snippet from main app.jsx:
         ```javascript
            <Routes>
               <Route path="/"
                  element={
                     <PublicRoute
                        element={Home}
                        currentUser={currentUser}
                        setCurrentUser={handleLogin}
                     />
                  }
               />
         ```
      - **Protected Routes**: Similarly, routes such as the user profile page among others, accessible only when a user is **logged in**.
      - **Exceptions**: The Home and 404 page can be accessed while either logged in or not.

2. #### **Example Scenarios**
   - If a logged-in user tries to access the login or signup page, they are automatically redirected to the user profile page.
   - If an unauthenticated user tries to access a protected route (e.g., via the URL bar), they are redirected to the login page.

3. #### **Dynamic Navigation Bar**

   The navigation bar dynamically updates its buttons and associated navigation routes based on the user's login status:
      - **Logged-In Users**: See options to view their profile, logout and other options.
      - **Unauthenticated Users**: See options to log in or sign up.

   Even if a user manually enters a protected route's URL while not logged in, they will be redirected to the login page. This robust system ensures a secure and user-friendly experience while maintaining the integrity of the application's routes and data. In addition all sensitive infomation must be requested from the backend after credentials are verified each time they need to be accessed.

4. #### **Backend Access**

   For access to sensitive data on the backend, directly or through the frontend application, a JWT token is required in the request header. If present, the server will re-compute the signature of the token using the Secret (stored in the backend .env file), the Header, and Payload of the token. If the recomputed signature does not match the recieved signature (tampered invalid token), or if the token has expired (determined by the exp key), or if the token is not present then access is denied. Furthermore, a user could potentially use a different user's valid unexpired token, this is also accounted for by using:
   ```javascript
      req.account = decoded
      if (req.params.account_id && req.account.account_id !== Number(req.params.account_id))
         return res.status(403).json({ error: 'Unauthorized action' })
   ```
   For further details see backend Readme and the verifyToken middleware function.


5. #### **Session Timeout Management**

   Session timeout is implemented using the token's expiration time (`exp`), which is embedded in the JWT. Here’s how it works:

   1. #### **User Login and Session Initialization**:
      After email-password have been verified by the backend through the bcrypt library, in addition to the multi-factor-authentication step, the following general steps are taken in the handleLogin function:
         - To maintain an active session, save token and general user data to local storage. Needed in cases of browser close then reopen or browser refresh, while still under 30 minutes and user has not logged out.
            ```javascript
            localStorage.setItem('currentUser', JSON.stringify(user))     
            localStorage.setItem('authToken', jwtToken)
            ```
         - Decodes the JWT using `jwtDecode` to extract the expiration time (`exp`).
            ```javascript
               const { exp } = jwtDecode(jwtToken)
            ```
         - Calculates the time remaining in milliseconds until the token expires. exp is a Unix timestamp - the number of seconds since Jan 1, 1970 - the Unix Epoch. Date.now() is time now in milliseconds since Unix Epoch.  
            ```javascript
               const expirationTime = exp * 1000 - Date.now()
            ```
         - timeoutIdRef useRef object used to reference the setTimeout() function such that on user logout the timer is cleared. Useful if a user logs out before the timer has expired - then logs back in still within the first login expiration window. In this example unexpected bahavior might occur, and this approach protects against it. 
      
            The setTimeout() function will execute its callback (in this case, handleLogout(true)) after the specified expirationTime has elapsed.
            ```javascript
               timeoutIdRef.current = setTimeout(() => {
                  handleLogout(true) 
               }, expirationTime)
            ```
         - This ensures that the user's session ends automatically when the token expires if the user does not manually log out.

   2. #### **Determining User Login Status**:
      - A user is considered "logged in" if local storage contains an item called `authToken`. 
      - Protected and Public routes check for the presence of this token and take proper corresponding action given specific conditions. Example for ProtectedRoute:
         ```javascript
            const ProtectedRoute = ({ element: Component, currentUser,
               setCurrentUser, setToken, handleLogout }) => {

               const token = localStorage.getItem('authToken')

               return token ?
                  <Component
                     currentUser={currentUser}
                     setCurrentUser={setCurrentUser}
                     setToken={setToken}
                     handleLogout={handleLogout}
                  /> :
                  <Navigate to="/login" />
            }
         ```

   3. #### **User Logout and Timeout Cleanup**:

      Whether the user logs out manually or the session times out, the handleLogout function is called:
      - Clears all session-related data (`authToken`, `currentUser`, etc.) from both React state and local storage.
      - Clears the timeout stored in `timeoutIdRef` to prevent memory leaks or unintended behavior.
      - Function snippet:
         ```javascript
            const handleLogout = (isTimeout = false) => {
               setCurrentUser(null)
               setToken(null)
               localStorage.removeItem('authToken')
               localStorage.removeItem('currentUser')
               clearTimeout(timeoutIdRef.current)
            }
         ```
---

### **B. Transaction Management**
#### **Transactions Table**
Users can view their income, expenses, and investment transactions in an interactive table format. The table supports sorting by transaction attributes, such as:
- Type
- Amount
- Category
- Recurring
- Recurring Frequency
- Risk Level
- Is Planned
- Date

#### **Transactions Graph**
Visualize account changes over time using D3.js:
- Track trends in checking, savings, and investment accounts.
- Zoom in/out to focus on specific transaction groups.
- Select which accounts to display for better insights into spending and savings patterns.

---

### **C. Stock Price Data Integration**
Real-time stock price data is fetched from Polygon.io API. Users can view the latest data for multiple stocks in a tabular format, including metrics such as open, close, high, low, and volume. This feature provides an overview of the stock market and helps users understand the status of their investments.

### **D. Market News**
Real-time Financial News obtained from finnhub.io

### **E. Multi-Factor Authentication (MFA)**
MFA is implemented to add an extra layer of security for user authentication, ensuring only authorized users can access their accounts. 

## Guest Login

The application includes a **Guest Login** feature, allowing visitors to explore the full functionality of the site without creating an account. This feature provides a seamless way to navigate the platform and interact with all features using pre-seeded "dummy" data. It is ideal for demonstrating the application’s capabilities while ensuring the integrity of real user data.


## Pages

- **Home**: Provides an overview of the application, welcoming users and highlighting key features.
- **Login**: Allows users to log in using their credentials to access their accounts securely.
- **Sign-Up**: Enables new users to create an account by providing necessary details.
- **Verify OTP**: Used during the login process to verify the one-time passcode sent to the user.
- **404**: Displays an error message when users attempt to navigate to a non-existent page.
- **Account Details**: Shows detailed information about the user’s account.
- **Edit Account Details**: Allows users to update their account information.
- **Edit Account Password**: Enables users to change their account password securely.
- **Dashboard**: Displays account balances for checking, savings, and investments in a consolidated view.
- **Investments**: Provides real time stock prices from third party API polygon.io.
- **Transactions**: Allows users to view transactions in both table and graph formats, including sorting and filtering options.
- **Add Transaction**: Enables users to log new financial transactions with details such as type, amount, and category.


## Deployed Application
- **Frontend hosted on Netlify**: [https://icapital-budgeter.netlify.app/](https://icapital-budgeter.netlify.app/)
- **Backend Server hosted on Render**: [https://icapital-budgeter-backend-services.onrender.com/](https://icapital-budgeter-backend-services.onrender.com/)

## GitHub Repositories
- **Frontend**: [https://github.com/jorammercado/icapital-budgeter-frontend](https://github.com/jorammercado/icapital-budgeter-frontend)
- **Backend**:  [https://github.com/jorammercado/icapital-budgeter-backend](https://github.com/jorammercado/icapital-budgeter-backend)

## Getting Started

### Prerequisites

To run this project, you will need:

- Node.js (version 14 or above)
- npm or yarn for package management

### Installation

1. Fork the repository from [https://github.com/jorammercado/icapital-budgeter-frontend](https://github.com/jorammercado/icapital-budgeter-frontend).

2. Then clone such repository:
   ```bash
   git clone https://github.com/your-username/icapital-budgeter-frontend.git
   ```
3. Navigate to the project directory:
   ```bash
   cd icapital-budgeter-frontend
   ```
4. Create a `.env` file in the root of the project directory with the following content (replace `4001` with the port your backend server is running on if different). To get a Polygon API key you can go to https://polygon.io/ and click [Create API Key](https://polygon.io/dashboard/signup?redirect=%2Fdashboard%2Fkeys):
   ```
   VITE_API_URL=http://localhost:4001
   VITE_POLYGON_API_KEY=your_polygon_api_key_here
   VITE_FINNHUB_API_KEY=your_finnhub_api_key_here
   ``` 
5. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

To start the development application:

```bash
npm run dev
```

This will run the frontend services.

## License
This project is licensed under the MIT License. See the [LICENSE](https://opensource.org/license/mit) file for details.

## Contact
For any inquiries or feedback, please contact:

- Joram Mercado: [GitHub](https://github.com/jorammercado), [LinkedIn](https://www.linkedin.com/in/jorammercado)
