// Node modules
import express from "express";
import cookieParser from 'cookie-parser'
import "dotenv/config";

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
// IMPORTANT Add cors

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
    const error = new Error("Page Not Found");
    error.statusCode = 404;
    next(error);
  });

// Error Handling Middleware
app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong..." } = err;
    console.log(`Error message: ${err.message}`);
    
    res.status(statusCode).json({
        success: false,
        message: message,
        statusCode,
      });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Running on Port http://localhost:${PORT}`);
});
