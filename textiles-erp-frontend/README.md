# Textiles ERP Frontend

This project is a front-end ERP system designed specifically for a textiles firm. It includes user authentication and different access levels for Admin and HR users.

## Features

- User authentication with login and registration forms.
- Role-based access control for Admin and HR users.
- User input forms for data entry relevant to the textiles industry.
- Responsive design for a seamless user experience.

## Project Structure

```
textiles-erp-frontend
├── public
│   └── index.html          # Main HTML file
├── src
│   ├── components          # React components
│   │   ├── Auth
│   │   │   ├── LoginForm.tsx        # Login form component
│   │   │   └── RegisterForm.tsx     # Registration form component
│   │   ├── Dashboard
│   │   │   ├── AdminDashboard.tsx    # Admin dashboard component
│   │   │   └── HRDashboard.tsx       # HR dashboard component
│   │   └── UserInput
│   │       └── UserInputForm.tsx    # User input form component
│   ├── contexts
│   │   └── AuthContext.tsx           # Authentication context provider
│   ├── routes
│   │   └── AppRoutes.tsx              # Application routing
│   ├── utils
│   │   └── auth.ts                    # Authentication utility functions
│   ├── App.tsx                        # Main application component
│   ├── index.tsx                     # Entry point for the React application
│   └── styles
│       └── style.css                  # CSS styles for the application
├── package.json                       # NPM configuration
├── tsconfig.json                      # TypeScript configuration
└── README.md                          # Project documentation
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd textiles-erp-frontend
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage

To start the development server, run:
```
npm start
```

Open your browser and navigate to `http://localhost:3000` to view the application.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or features you'd like to add.

## License

This project is licensed under the MIT License.