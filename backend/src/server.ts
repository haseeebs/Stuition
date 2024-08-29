// Node modules
import "dotenv/config";
import express from "express";
import cookieParser from 'cookie-parser'

// Middleware
import errorHandlerMiddleware from "middleware/errorHandlerMiddleware";

// Utilities
import ExpressError from "utils/ExpressError";

// Configurations
import connectDb from "./config/db";

// Route handlers
import userRoutes from './routes/userRoutes';
import courseRoutes from './routes/courseRoutes';
import profileRoutes from './routes/profileRoutes';
import paymentRoutes from './routes/paymentRoutes';
import categoryRoutes from './routes/categoryRoutes';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

// Connect to the database
connectDb();

app.get("/", async (req, res) => {
  res.send(`<h1>Hi there, Haseeb here...</h1>`); // Root route handler
});

// Route middlewares
app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/profile', profileRoutes);
app.use('/api/v1/courses', courseRoutes);
app.use('/api/v1/payment', paymentRoutes);
app.use('/api/v1/categories', categoryRoutes);

// Catch-all route for undefined routes
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

// Error Handling Middleware
app.use(errorHandlerMiddleware);

// Start the server
app.listen(PORT, () => {
  console.log(`Running on Port http://localhost:${PORT}`);
});