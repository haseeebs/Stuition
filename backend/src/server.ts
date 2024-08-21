// Node modules
import express from "express";
import "dotenv/config";

// Configurations
import connectDb from "./config/db";

// Route handlers
import userRoutes from './routes/userRoutes';
import profileRoutes from './routes/profileRoutes';
import courseRoutes from './routes/courseRoutes';
import paymentRoutes from './routes/paymentRoutes';

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to the database
connectDb();

app.get('/', async (req, res) => {
    res.send(`<h1>Hi there, Haseeb here...</h1>`);
});

app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/profile', profileRoutes);
app.use('/api/v1/courses', courseRoutes);
app.use('/api/v1/payment', paymentRoutes);

app.listen(PORT, () => {
    console.log(`Running on Port http://localhost:${PORT}`);
});