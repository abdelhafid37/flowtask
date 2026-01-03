# FlowTask

A full-stack MERN task management application that helps users organize and track their tasks efficiently.

## Features

- **User Authentication** - Secure registration and login with JWT
- **Task Management** - Create, read, update, and delete tasks
- **Task Status** - Track tasks as Pending, In Progress, or Completed
- **Due Dates** - Set and manage task deadlines
- **Private Tasks** - Each user sees only their own tasks
- **Clean UI** - Intuitive and responsive interface

## Tech Stack

### Backend

- `Node.js`
- `Express.js`
- `MongoDB` with `Mongoose`
- `JWT` for authentication
- `bcryptjs` for password hashing
- `cors` for Cross-Origin Resource Sharing
- `nodemon` for auto server restart
- `dotenv` for environment variables loading

```sh
npm install express dotenv mongoose cors
npm install --save-dev nodemon
```

### Frontend

- `React`
- `React Router` for navigation
- `Axios` for API calls
- `Tailwind` for styling

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v22.x.x or higher)
- MongoDB (local or MongoDB Atlas account)
- npm or yarn

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/abdelhafid37/flowtask.git
cd flowtask
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
NODE_ENV=development
```

Start the backend server:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend` directory:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

Start the React app:

```bash
npm start
```

The application will open at `http://localhost:3000`

## Usage

1. **Register** - Create a new account with email and password
2. **Login** - Sign in with your credentials
3. **Create Tasks** - Add new tasks with title, description, status, and due date
4. **Manage Tasks** - Edit, delete, or update the status of your tasks
5. **Logout** - Securely end your session

## Project Structure

```
flowtask/
├── backend/                # Backend
│   ├── config/            # Configuration files
│   ├── controllers/       # Request handlers
│   ├── middleware/        # Custom middleware
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   └── server.js         # Entry point
│
├── frontend/              # Frontend
│   ├── public/
│   └── src/
│       ├── components/   # React components
│       ├── pages/        # Page components
│       ├── services/     # API services
│       ├── context/      # Context providers
│       └── App.jsx       # Main component
│
└── README.md
```

## API Documentation

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for detailed API endpoint documentation.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built as a learning project for MERN stack development
- Inspired by modern task management applications

## Contact

Abdelhafid - [@abdelhafid](https://instagram.com/abdelhafid.el.houari)

Project Link: [https://github.com/abdelhafid37/flowtask](https://github.com/abdelhafid37/flowtask)

---

Made with the MERN stack
