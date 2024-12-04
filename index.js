const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // Import CORS
const authRoutes = require('./routes/userRoutes');
const protect = require('./Middleware/authMiddleware');

dotenv.config();
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('MongoDB connection error:', err));

// CORS Configuration
const corsOptions = {
    origin: ['http://localhost:5173', 'https://new-vrv-assignment.vercel.app','https://rbac-ui-vrv.vercel.app'], // Allow multiple origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true, // Enable credentials sharing
};
app.use(cors(corsOptions)); // Use CORS middleware

app.use(express.json()); // Middleware to parse JSON
app.use('/api/auth', authRoutes);

// Protecting a route with role-based access control
app.get('/', (req, res) => {
    res.json({ message: "Welcome Admin!" });
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});
