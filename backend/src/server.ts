// Node modules
import express from "express";
import "dotenv/config";

// Configurations
import connectDb from "./config/db";

// Route handlers
import userRoutes from './routes/userRoutes';

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to the database
connectDb();

app.get('/', async (req, res) => {
    res.send(`<h1>Hi there, Haseeb here...</h1>`);
});

app.use('/api/v1/auth', userRoutes);

app.listen(PORT, () => {
    console.log(`Running on Port http://localhost:${PORT}`);
});