E-commerce Application
This is a full-stack E-commerce application built using the MERN stack (MongoDB, Express.js, React, Node.js). The application features a complete shopping experience, including product browsing, searching, filtering, cart management, payment integration with Stripe, and user account management with admin capabilities.

Table of Contents
1. Features
2. Installation
3. Environment Variables
4. Usage
5. Tech Stack
6. Folder Structure
7. Scripts
 
*Features*

User Authentication: Sign up, login, and profile management.
Product Management: View products, filter by categories, and search functionality.
Cart Management: Add, remove, and update items in the cart.
Checkout Process: Shipping information, payment processing with Stripe, and order confirmation.
Order History: View past orders and their statuses.
Admin Features: Manage products, orders, users, and reviews.
Responsive Design: Fully responsive for mobile and desktop users.


*Installation*

Clone the repository:

cd ecommerce-app
Install backend dependencies:

cd backend
npm install

Install frontend dependencies:

npm install

*Environment Variables*

Create a .env file in the backend folder with the following variables:

PORT=5000
DB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/ecommerce
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=5d
COOKIE_EXPIRE=5
SMPT_SERVICE=gmail
SMPT_MAIL=your-email@gmail.com
SMPT_PASSWORD=your-email-password
STRIPE_API_KEY=your_stripe_api_key
STRIPE_SECRET_KEY=your_stripe_secret_key
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

*Usage*

Running the Backend Server
Navigate to the backend folder and start the server:

cd backend
npm start

Running the Frontend Server
Navigate to the frontend folder and start the React application:
cd frontend
npm start
The backend server will be running on http://localhost:5000, and the frontend will be on http://localhost:3000.

*Tech Stack*

Frontend: React, Redux, Axios, Stripe, React-Alert, and other libraries.
Backend: Node.js, Express.js, MongoDB, Mongoose, JWT, Stripe.
Database: MongoDB Atlas.
Cloud Storage: Cloudinary for image uploads.
Payment Processing: Stripe.

*Folder Structure*

ecommerce-app/
│
├── backend/
│   ├── config/           # Configuration files for DB, cloudinary, etc.
│   ├── controllers/      # API controllers
│   ├── models/           # Mongoose models
│   ├── routes/           # Express routes
│   ├── utils/            # Utility functions
│   ├── server.js         # Entry point for the backend server
│   └── .env              # Environment variables
│
└── frontend/
    ├── public/           # Public assets
    ├── src/
    │   ├── actions/      # Redux actions
    │   ├── components/   # React components
    │   ├── reducers/     # Redux reducers
    │   ├── store/        # Redux store configuration
    │   ├── App.js        # Main App component
    │   ├── index.js      # Entry point for the React app
    │   └── ...
    └── package.json      # Frontend dependencies

*Scripts*

Backend Scripts
npm start: Starts the server.
npm run dev: Starts the server in development mode with nodemon.

Frontend Scripts
npm start: Starts the React development server.
npm run build: Builds the app for production to the build folder.
npm test: Runs the test suite.
