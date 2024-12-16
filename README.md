# <img src="./public/logo-icapital.png" height="75px" alt="iCapital Logo">

[<img src="./public/home.png" height="185px" alt="Home Screenshot">](https://icapital-budgeter.netlify.app/)

## Description
The iCapital Budgeter Frontend is part of the Software Engineer Take-Home Exam Project, designed to evaluate fellows' analytical, software development, and problem-solving skills by assessing their ability to design and develop a full-stack application. This project aims to provide insight into the candidate's thought processes, research methods, and approach to solving problems.

The application allows users to track income and expenses by means of logging financial transactions. Among others, using fields such as transaction type and category, users can track three accounts: checking, savings, and investments, as functions of these financial transactions. The application also allows users to view real-time stock prices and analyze stock performance, helping them make more informed investment decisions. The data for the three accounts is graphed in order for users to see trends in their spending and savings patterns.

See [backend repository](https://github.com/jorammercado/icapital-budgeter-backend/blob/main/README.md) for full security features and backend services.

## Contents
- [Tech Stack](#tech-stack)
- [Deployed Application](#deployed-application)
- [GitHub Repositories](#github-repositories)
- [Guest Login](#guest-login)
- [Pages](#pages)
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
         - [General Attributes](#general-attributes)
         - [Table Styling](#table-styling)
         - [Sorting Functionality](#sorting-functionality)
         - [Adding Transactions](#adding-transactions)
         - [Editing & Deleting Transactions](#editing--deleting-transactions)
         - [Balance Updates](#balance-updates)
      - [Transactions Graph](#transactions-graph)
         - [Core Functionalities](#core-functionalities)
         - [Axes & Visualization](#axes--visualizationh)
         - [Dynamic Scaling](#dynamic-scaling)
         - [User Interaction Features](#user-interaction-features)
            - [Legend and Toggling](#legend-and-toggling)
            - [Brushing for Selection](#brushing-for-selection)
         - [Why This Graph Matters](#why-this-graph-matters)
   - [C. Multi-Factor Authentication](#c-multi-factor-authentication-mfa)
   - [D. Stock Price Data Integration](#d-stock-price-data-integration)
   - [E. Market News](#e-market-news)
- [Getting Started](#getting-started)
- [License](#license)
- [Contact](#contact)

## Tech Stack
- **Frontend**: React, SCSS (BEM), D3, Bootstrap, styled-components
- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **Third Party API**: Polygon.io for real-time stock data, Finnhub.io for market news
- **Authentication**: JWT (using jwt-decode for session management & security)

## Deployed Application
- **Frontend hosted on Netlify**: [icapital-budgeter.netlify.app](https://icapital-budgeter.netlify.app/)
- **Backend Server hosted on Render**: [icapital-budgeter-backend-services.onrender.com](https://icapital-budgeter-backend-services.onrender.com/)

## GitHub Repositories
- **Frontend**: [github.com/jorammercado/icapital-budgeter-frontend](https://github.com/jorammercado/icapital-budgeter-frontend)
- **Backend**:  [github.com/jorammercado/icapital-budgeter-backend](https://github.com/jorammercado/icapital-budgeter-backend)

## Guest Login
The application includes a **Guest Login** feature, allowing visitors to explore the full functionality of the site without creating an account. This feature provides a seamless way to navigate the platform and interact with all features using pre-seeded "dummy" data. It is ideal for demonstrating the application’s capabilities while ensuring the integrity of real user data.

## Pages
- **Home**: Provides an overview of the application, welcoming users and highlighting key features.
- **Login**: Allows users to log in using their credentials to access their accounts securely.
- **Sign-Up**: Enables new users to create an account by providing necessary details.
- **Verify OTP**: Used during the login process to verify the one-time passcode sent to the user's email.
- **404**: Displays an error message when a user attempt to navigate to a non-existent page.
- **Account Details**: Shows detailed information about the user’s account.
- **Edit Account Details**: Allows users to update their account information.
- **Edit Account Password**: Enables users to change their account password securely.
- **Dashboard**: Displays account balances for checking, savings, and investments in a consolidated view.
- **Investments**: Provides real time stock prices from third party API polygon.io.
- **Market News**: Provides real time financial news from third party API finnhub.io.
- **Transactions**: Allows users to view transactions in both table and graph formats, including sorting and filtering options.
- **Add Transaction**: Enables users to log new financial transactions with details such as type, amount, and category.
- **Edit Transaction**: Enables users to edt or delete a financial transactions.

## Features
---
### **A. Session Security**
Session management on the frontend is implemented using a JWT (JSON Web Token) issued by the backend after verifying user credentials. The JWT is securely stored in local storage with an expiration time of 30 minutes. Upon expiration or user logout, the token and general user data are automatically removed from local storage to maintain session security. Sensitive user data such as financial transactions and password are not stored on the frontend. Instead when access is needed, they are retrieved from the backend after verifying the token attached to the request header.

1. ### **Route Access Control**

   Access to routes on the frontend is controlled by wrapping them in either a **Public Route** or a **Protected Route** component. Example code snippet:

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

      - **Public Routes**: Routes such as login and signup pages, accessible only when a user is **not logged in**. 
      - **Protected Routes**: Similarly, routes such as the user profile page among others, accessible only when a user is **logged in**.
      - **Exceptions**: The Home and 404 page can be accessed while either logged in or not.

2. ### **Example Scenarios**
   - If a logged-in user tries to access the login or signup page, they are automatically redirected to the user profile page.
   - If an unauthenticated user tries to access a protected route (e.g., via the URL bar), they are redirected to the login page.

3. ### **Dynamic Navigation Bar**

   The navigation bar dynamically updates its buttons and associated navigation routes based on the user's login status:
      - **Logged-In Users**: See options to view their profile, logout and other options.
      - **Unauthenticated Users**: See options to log in or sign up.

   Even if a user manually enters a protected route's URL while not logged in, they will be redirected to the login page. This robust system ensures a secure and user-friendly experience while maintaining the integrity of the application's routes and data. In addition all sensitive information must be requested from the backend after credentials are verified each time they need to be accessed.

4. ### **Backend Access**

   For access to sensitive data on the backend, directly or through the frontend application, a JWT token is required in the request header, if present, the server will:
      1. Re-compute the signature of the token using the Secret (stored in the backend .env file), Header and Payload of the token. 
      2. If the recomputed signature does not match the received signature (tampered invalid token), or if the token has expired (determined by the exp key), or if the token is not present, then access is denied. 
      3. Furthermore, a user could potentially use a different user's valid unexpired token, this is also accounted for by using:
   ```javascript
      req.account = decoded
      if (req.params.account_id && req.account.account_id !== Number(req.params.account_id))
         return res.status(403).json({ error: 'Unauthorized action' })
   ```
   For further details see backend Readme and the verifyToken middleware function.


5. ### **Session Timeout Management**

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
         - timeoutIdRef useRef object used to reference the setTimeout() function such that on user logout the timer is cleared. Useful if a user logs out before the timer has expired - then logs back in still within the first login expiration window. In this example unexpected behavior might occur, and this approach protects against it. 
      
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
1. ### **Transactions Table**
   
   The financial transactions table is a tool that enables users to comprehensively manage, categorize, and analyze their income, expenses, and investments. Presented in an interactive format, the table supports dynamic sorting by key transaction attributes, facilitating in-depth financial analysis and decision-making. 

   Essentially, the table tracks a checking, savings, and investment account and updates these balances based on transaction attributes. Balances start at 0 and adjust dynamically as transactions are added. Below is a detailed breakdown of transaction attributes:

   1. #### **General Attributes**

   - **`transaction_type`**: Denotes the nature of the financial activity and must conform to one of the following enumerated values:
      - `income`
      - `expense`
      - `investment`
      - `deposit`

   - **`amount`**: Represents the monetary value of the transaction. This value is formatted as a decimal to ensure precision.

   - **`category`**: Assigns the transaction to a predefined classification, allowing users to systematically track and evaluate financial activities. The available categories include but are not limited to:
      - `salary`, `bonus`, `interest`, `dividend`, `rental income`, `business income`, `investment`, `groceries`, `utilities`, `rent/mortgage`, `transportation`, `education`, `healthcare`, `entertainment`, `subscriptions`, `travel`, `savings`, `emergency fund`, `retirement`, `clothing`, `dining`, `household supplies`, `charity`, `debt repayment`, `other`, `wages`, `account funding`, `loan disbursement`, `checking`

   - **`description`**: An optional text field permitting users to provide additional contextual information or notes pertinent to the transaction.

   - **`recurring`**: A boolean field indicating whether the transaction is periodic. This facilitates tracking of ongoing financial commitments or income streams.

   - **`recurring_frequency`**: Specifies the interval of recurrence for periodic transactions. Valid options include:
      - `one-time`
      - `daily`
      - `weekly`
      - `monthly`
      - `yearly`

   - **`risk_level`**: Qualitatively assesses the risk associated with the transaction. This attribute enhances financial planning by categorizing transactions into one of the following tiers:
      - `n/a`
      - `low`
      - `moderate`
      - `high`

   - **`is_planned`**: A boolean indicator that identifies whether the transaction was anticipated and included in preemptive financial planning.

   - **`created_at`**: A timestamp that records the precise moment the transaction was created. This value defaults to the current system time upon transaction entry.

      These attributes collectively provide users with an unparalleled level of control and insight into their financial activities. By leveraging the table’s extensive sorting and filtering capabilities, users can derive actionable insights and maintain meticulous records tailored to their unique financial objectives.   

   2. #### **Table Styling**

      The table is constructed using Bootstrap classes for style and responsive design, further styling alteration done using custom SCSS. Below is a snippet of the table tag declaration:
         ```html
            <section className="transactions__container">
               <table className="table table-hover table-responsive table-dark transactions__container__table table-bordered">
                  <tbody>
                     <tr 
         ```

      #### **Explanation of Bootstrap Classes**:
      - **`table`**: Defines a basic table layout.
      - **`table-hover`**: Adds a hover effect on table rows.
      - **`table-responsive`**: Ensures the table is scrollable on smaller screens.
      - **`table-dark`**: Applies a dark theme to the table.
      - **`table-bordered`**: Adds borders to all table cells.

      #### **Custom Styles**:
      The table styling was customized to ensure consistency with the application’s theme. Example SCSS snippet of some alterations:

      ```scss
         &__table {
            background-color: #09213A;
            width: 100%;
            table-layout: auto;
            overflow-x: auto;
            td {
               background-color: #09213A !important;
            }
         }
      ```

      #### **Notes on customization presented here**:
      - **`background-color: #09213A;`**: Sets the table and cell background to a custom dark blue.
      - **`table-layout: auto;`**: Allows the table layout to adjust automatically based on content.
      - **`overflow-x: auto;`**: Enables horizontal scrolling for better responsiveness.
      - **`!important`**: Ensures that the custom background color overrides default Bootstrap styling.


   3. #### **Sorting Functionality**

      Sorting is accomplished through the enabled buttons at th top of the table (some are disabled as sorting would be nonsensical for some columns).

      Sorting allows users to reorder transactions based on selected attributes (e.g., amount, date). Below is an example of a sorting function for the **Amount** column, other columns are similarly sorted and have its corresponding toggling variable:

      ```javascript
         const [amountOrder, setAmountOrder] = useState(false)
         const handleSortAmount = (event) => {
            event.preventDefault()
            const sortedTransactions = [...allTransactions].sort((a, b) => {
               if (amountOrder) {
                  return b.amount - a.amount // Descending order
               }
               return a.amount - b.amount // Ascending order
            })

            setAllTransactions(sortedTransactions)
            setAmountOrder(!amountOrder)
         }
      ```

      - **Initial State**: The `amountOrder` boolean determines whether sorting is ascending (`false`) or descending (`true`).
      - **Sorting Logic**: The `sort` method compares `a.amount` and `b.amount` to reorder the array.
      - **State Update**: After sorting, the updated transactions are saved in `setAllTransactions`, and the sort order toggles.
      - **Table Remounts**: `allTransactions` is managed as a useState object, and any updates to its state trigger a rerendering of the table component to reflect the updated data.

      

   4. #### **Adding Transactions**
      Users can add new financial transactions through a form interface. The Add Transaction button is at the bottom middle of the table. The following fields are available:
      - `transaction_type`: Income, expense, investment, or deposit. Form default set to income.
      - `amount`: Must be a non-zero value. Form default set to 0.
      - `category`: Defined categories (e.g., salary, groceries, rent). Form default set to salary
      - `description`: Optional field for additional transaction details.
      - `recurring`: Boolean indicating whether the transaction repeats. Form default set to false.
      - `recurring_frequency`: Frequency of recurrence (e.g., daily, weekly). Form default set to one-time.
      - `risk_level`: Risk assessment (e.g., low, moderate). Form default set to n/a.
      - `is_planned`: Indicates if the transaction was pre-planned. Form default set to false.

      The form employs controlled inputs to dynamically update the state as users enter data. State Binding is achieved through the `transaction` object, while Dynamic Updates are implemented using the following function:
      ```javascript
         const handleInputChange = (e) => {
            const { name, value, type, checked } = e.target
            setTransaction({
               ...transaction,
               [name]: type === "checkbox" ? checked : value,
            })
         }
      ```

      #### Explanation of `handleInputChange`:
      The `handleInputChange` function is a core utility for managing controlled inputs within the form. It dynamically updates the `transaction` state object by:

      - **Destructuring `e.target`**: Extracting the `name`, `value`, `type`, and `checked` properties from the event target to identify the input field and its new value.
      - **Updating State Dynamically**: Using the `name` property as a key to update the corresponding field in the `transaction` object.
      - For checkboxes, the `checked` property determines the value (true/false).
      - For all other input types, the `value` property is used.
      - **Maintaining Immutability**: By spreading the existing `transaction` object (`...transaction`), only the targeted field is updated, leaving other fields unchanged.

      This ensures the form is responsive and the `transaction` object always reflects the current input values, enabling seamless addition of new transactions.

      A Back button is also provided if user no longer wishes to add a transaction.

   5. #### **Editing & Deleting Transactions**

      Users can edit or delete a transaction by selecting its corresponding row on the table. Clicking anywhere on the row navigates them to the edit transaction page. The general setup of this page is similar to the Add Transaction form, with the following differences:

      - **Pre-filled Fields**: The form fields are pre-populated with the transaction's current values, allowing users to make modifications instead of entering data from scratch.
      - **API Method Variations**: The API calls to the backend use the `PUT` method for updates and the `DELETE` method for deletions.
      - **Delete Confirmation**: Deleting a transaction requires user confirmation through a prompt. Users must confirm their intention to delete by pressing a second confirmation button, or they can cancel the operation to avoid accidental deletions.

      This streamlined approach ensures that users can efficiently manage their transactions while maintaining the integrity and accuracy of their financial data. 


   6. #### **Balance Updates**

      Balances for checking, savings, and investment accounts are dynamically updated. The update logic operates as follows:

      - **Initial Balances**: All accounts start with an initial balance of 0. 
      - **Transaction Evaluation**: Each transaction is processed to determine which account (‘checking’, ‘savings’, or ‘investments’) will be affected. The decision is based on the `transaction_type` and `category` of the transaction. For example:
         - Expenses reduce the balance, with the affected account determined by the category (e.g., `investment` decreases `investments`).
         - Income, investments, and deposits increase the balance.
         - If transaction type is deposit, then the category will determine which account will be affected, and so on.

         Full logic used provided in TransactionsList.jsx

      - **Dynamic Updates**:
         - The transaction's `amount` is either added or subtracted, depending on the type of transaction.
         - Example: For an update to the `checking` account:
         ```javascript
            checking.push(checking[checking.length - 1] + updateValue)
         ```
         - Non-target accounts retain their prior balances:
         ```javascript
            savings.push(savings[savings.length - 1])
            investments.push(investments[investments.length - 1])
         ```

      - **Final Account States**: After all transactions are processed, the final state of each account is stored as an array. **These arrays track the running balance over time per transaction**:
         ```javascript
            setCheckingBalance(checking)
            setSavingsBalance(savings)
            setInvestmentBalance(investments)
         ```

      This mechanism ensures accurate and real-time account updates, providing users with immediate insights into their financial standing without requiring backend recalculation. By leveraging dynamic processing and immutability principles, the application delivers both performance and reliability in balance management.

2. ### **Transactions Graph**
      The Transactions Graph provides users with a dynamic visualization of changes in their financial accounts (checking, savings, and investments) over time. Implemented using D3.js, this interactive graph includes the following features:

      1. #### **Core Functionalities**
         1. **Account Visualization**: Displays the running balances of checking, savings, and investment accounts as line graphs.
         2. **Dynamic Data Updates**: Graph data updates in real-time based on user transactions, reflecting changes immediately.
         3. **Zoom**: Users can zoom in/out to focus on specific time periods or transactions, providing granular insights into account trends.
         4. **Customizable Visibility**: A built-in legend allows users to toggle individual accounts (checking, savings, investments) on or off, enhancing clarity.

      2. #### **Axes & Visualization**
         - The X-axis represents transactions by order of time/date - logged into the system. If a given transaction was performed on the savings account for example, then the other two accounts will remain the same for that particular transaction. 
         - The Y-axis scales to the balance for a given account, updating dynamically as data changes.
         - **Styling**
            1. The graph utilizes a dark theme (`#09213A`) to enhance visual contrast and sync with site theme.
            2. The graph's elements are carefully color-coded to distinguish between account types and sync with site theme:
               - Checking: `#1480d8`
               - Savings: `#2ca8e2`
               - Investments: `#07a`
            3. Lines and shaded areas under lines create a visually engaging experience when data changes or users zoom in/out.
            4. Specific data points are plotted as small circles for precise visualization.

      3. #### **Dynamic Scaling**
      - The graph dynamically adjusts to the user's screen size to ensure optimal display across devices. 
      In the following code snippet, an event listener is added to the window object - when screen size changes, it triggers the function handleResize to execute. 
         ```javascript
            const [screenWidth, setScreenWidth] = useState(window.innerWidth)
               useEffect(() => {
                  const handleResize = () => setScreenWidth(window.innerWidth)
                  window.addEventListener('resize', handleResize)
                  return () => window.removeEventListener('resize', handleResize)
            }, [])
         ```
         Then state variable `screenWidth` is then used adjust graph width dynamically. Code snippet:  
         ```javascript
            useEffect(() => {
               d3.select("#my_dataviz svg").remove()
               let margin = { top: 60, right: 115, bottom: 50, left: 50 },
                  width = ((
                     screenWidth > 1660 ? 1400 :
                     screenWidth <= 1660 && screenWidth > 1560 ? 1350 :
         ```

      4. #### **User Interaction Features**
         1. #### **Legend and Toggling**:
            - A clickable legend allows users to toggle the visibility of individual accounts.
            - Color-coded boxes indicate whether an account is visible or hidden.

            Sample code snippet:
            ```javascript
               legend.append("rect")
                  .attr("x", width + 8) 
                  .attr("width", 15) 
                  .attr("height", 15) 
                  .attr("cursor", 'pointer') 
                  .on("click", function (event, d) { 
                     visible[d] = !visible[d];
                     svg.selectAll("." + d).style("opacity", visible[d] ? 1 : 0);
                  });
               ```
               - `legend.append("rect")`: Creates a rectangle element for each account type in the legend.
               - `.attr("x", width + 8)`: Positions the legend rectangle to the right of the graph.
               - `.attr("width", 15)` and `.attr("height", 15)`: Define the size of the legend boxes.
               - `.attr("cursor", 'pointer')`: Changes the cursor to indicate interactivity.
               - `.on("click", function (event, d) { ... })`: Toggles the visibility of the corresponding account data when the legend box is clicked.
               - `svg.selectAll("." + d).style("opacity", visible[d] ? 1 : 0)`: When a user toggles the visibility of an account from the legend, the corresponding graph lines, points, and areas for that account are either displayed or hidden based on the updated visibility state (visible[d]). Opacity 1 is visible, 0 hidden.

         2. #### **Brushing for Selection**:
            - Users can select a range on the X-axis to zoom into specific transactions. 
               1. When hovering over graph, cross hairs will be the pointer.
               2. Click and hold on the starting X-axis range anywhere on the chart
               3. Drag to the end of the range you would like to see, then let go of the drag. That selected range will be zoomed into.
               4. To zoom out double click anywhere on the chart area.
            - A brushing interaction enables focused analysis while maintaining ease of use.

            Sample code snippet:
            ```javascript
            let brush = d3.brushX()
               .extent([[0, 0], [width, height]])
               .on("end", updateChart);
            svg.append("g").attr("class", "brush").call(brush);
            ```
            - `let brush = d3.brushX()`: Initializes (functional & visual) a horizontal brush for the X-axis.
            - `.extent([[0, 0], [width, height]])`: Defines the area where the brush can operate.
            - `.on("end", updateChart)`: Calls the `updateChart` function when the user finishes brushing.
            - `svg.append("g").attr("class", "brush").call(brush)`: Appends the brush as a `g` element (group) to the SVG canvas and activates the brushing functionality within the defined area.
               1. `svg.append("g")`: This appends a new group (`g`) element to the SVG canvas. A `g` element in SVG serves as a container for grouping other SVG elements. Useful for organizing related elements, like the components of a brushing interaction.
               2. `.attr("class", "brush")`: This assigns a CSS class name (`brush`) to the `g` element, allowing styling or referencing it later in the code.
               3. `.call(brush)`: This "calls" the `brush` function defined earlier, and binds the brushing behavior to the `g` element. 



      5. #### **Why This Graph Matters**
         This interactive graph empowers users to make data-driven financial decisions by offering:
         - A clear, real-time visualization of account trends.
         - Tools to analyze patterns in income, expenses, and investments.
         - The ability to focus on specific data points for deeper insights.

         By leveraging D3.js for its robust data visualization capabilities, the Transactions Graph delivers an intuitive and responsive user experience while handling complex financial datasets efficiently.
---
### **C. Multi-Factor Authentication (MFA)**
MFA is implemented to add an extra layer of security for user authentication, ensuring only authorized users can access their accounts. 

---
### **D. Stock Price Data Integration**
Real-time stock price data is fetched from Polygon.io API. Users can view the latest data for multiple stocks in a tabular format, including metrics such as open, close, high, low, and volume. This feature provides an overview of the stock market and helps users understand the status of their investments.

---
### **E. Market News**
Real-time Financial News obtained from finnhub.io


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
