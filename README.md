# <img src="./public/logo-icapital.png" height="75px" alt="iCapital Logo">

[<img src="./public/home.png" height="75px" alt="Home Screenshot">](https://icapital-budgeter.netlify.app/)

## Description

The iCapital Budgeter Frontend is part of the Software Engineer Take-Home Exam Project, designed to evaluate fellows' analytical, software development, and problem-solving skills by assessing their ability to design and develop a full-stack application. This project aims to provide insight into the candidate's thought processes, research methods, and approach to solving problems, highlighting their adaptability in a rotational program.

The application allows users to track income and expenses, calculate disposable income, and make informed financial decisions. Additionally, it offers optional investment guidance to help users achieve their financial goals, focusing on low-risk investment opportunities based on their disposable income. The application also allows users to view real-time stock prices and analyze stock performance, helping them make more informed investment decisions.

See [backend repository](https://github.com/jorammercado/icapital-budgeter-backend/blob/main/README.md) for full security features and backend services.

## Tech Stack

- **Frontend**: React, SCSS (BEM), D3, Bootstrap, styled-components
- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **API**: Polygon.io for real-time stock data
- **Authentication**: JWT (using jwt-decode for session management)

## Features

- **Transaction Table**: Users can view their income, expenses, and investment transactions in an interactive table format. The table includes sorting capabilities for different transaction attributes such as type, amount, category, and date.

- **Graphs for Transactions**: Line graph are implemented using D3.js to provide a visual representation of how users checking, saving and investment accounts change over time as a function of individual transactions, helping users make better more informed decisions.

- **Stock Price Data Integration**: Real-time stock price data is fetched from Polygon.io API. Users can view the latest data for multiple stocks in a tabular format, including metrics such as open, close, high, low, and volume. This feature provides an overview of the stock market and helps users understand the status of their investments.

- **Multi-Factor Authentication (MFA)**: MFA is implemented to add an extra layer of security for user authentication, ensuring only authorized users can access their accounts. 

- **Password Hashing and JWT Tokens**: On the backend, passwords are securely hashed, and JWT tokens are issued for session management, ensuring secure user authentication.


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

1. Clone the repository:
   ```bash
   git clone https://github.com/username/icapital-budgeter-frontend.git
   ```
2. Navigate to the project directory:
   ```bash
   cd icapital-budgeter-frontend
   ```
3. Create a `.env` file in the root of the project directory with the following content (replace `4001` with the port your backend server is running on if different):
   ```
   VITE_API_URL=http://localhost:4001
   VITE_POLYGON_API_KEY=your_polygon_api_key_here
   ``` 
4. Install dependencies:
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
