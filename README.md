# Codeforces Contest Dashboard

This project is a Codeforces Contest Dashboard built with Shopify Polaris, React, and TailwindCSS. Follow the steps below to set up the project locally on your machine.

## Prerequisites

Make sure you have the following installed:

- **Node.js** (v16 or higher) and npm
- **Git**
- **A text editor or IDE** (e.g., VS Code)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/codeforces-dashboard.git
cd codeforces-dashboard
```

### 2. Install Dependencies

Run the following command to install the project dependencies:

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and add any necessary environment variables (if applicable). For example:

```env
REACT_APP_API_URL=https://api.codeforces.com
```

### 4. Start the Development Server

Run the following command to start the development server:

```bash
npm run dev
```

This will start the application on [http://localhost:3000](http://localhost:3000).

### 5. Build for Production (Optional)

If you want to create a production build, use the following command:

```bash
npm run build
```

The build output will be located in the `dist/` directory.

## Project Structure

Here's an overview of the project's folder structure:

```
├── src
│   ├── components     # Reusable React components
│   ├── pages          # Page components
│   ├── styles         # TailwindCSS configuration
│   ├── utils          # Utility functions
│   └── App.jsx        # Main app entry point
├── public             # Public assets
├── package.json       # Dependency configuration
├── vite.config.js     # Vite configuration
└── README.md          # Project documentation
```

## Available Scripts

- **`npm run dev`**: Starts the development server.
- **`npm run build`**: Builds the application for production.
- **`npm run lint`**: Lints the codebase for style and syntax issues.

## Features

- Search contests using the search bar.
- View contest details with a user-friendly UI.
- Navigate through contests with pagination.

## Troubleshooting

### Common Issues

1. **Dependencies not installing:**
   - Make sure you are using a compatible version of Node.js.

2. **Environment variables not working:**
   - Double-check your `.env` file for errors and restart the server after changes.

3. **Port conflicts:**
   - If the default port is in use, specify a different port in `vite.config.js` or the start script.

```bash
npm run dev -- --port 4000
```

## Contributing

Feel free to submit issues or pull requests for improvements and new features. Contributions are always welcome!

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.
