import mongoose from "mongoose";
import Course from "../models/courseModel.js";
import Category from "../models/categoryModel.js";
import User from "../models/userModels.js";
import { predefinedCategories, sampleUsers } from "./seedData.js";

// Connect to the database
const mongoURI = 'mongodb://localhost:27017/stuition';

mongoose.connect(mongoURI,)
  .then(() => console.log('MongoDB connected.'))
  .catch(err => console.error('MongoDB connection error:', err));

// Function to import data
async function importData() {
  try {
    // Clearing existing data
    await User.deleteMany({});
    await Category.deleteMany({});

    // Inserting sample users and categories
    const insertedUsers = await User.insertMany(sampleUsers);
    const insertedCategories = await Category.insertMany(predefinedCategories);

    console.log("Users inserted:", insertedUsers);
    console.log("Categories inserted:", insertedCategories);
  } catch (err) {
    console.error("Error importing data:", err);
  } finally {
    mongoose.connection.close();
  }
}

// Another approach using for-of for individual updates
const importData2 = async () => {
  try {
    for (const user of sampleUsers) {
      await User.findOneAndUpdate(
        { email: user.email },
        user,
        { upsert: true, new: true }
      );
    }
    console.log('Users inserted or updated...');

    for (const category of predefinedCategories) {
      await Category.findOneAndUpdate(
        { name: category.name },
        category,
        { upsert: true, new: true }
      );
    }
    console.log('Categoriess inserted or updated...');
  } catch (error) {
    console.error('Error importing data with for-of:', error);
  }
};

// Function to destroy data
const destroyData = async () => {
  try {
    // Deleting all documents in User, Category, and Course collections
    await User.deleteMany({});
    await Category.deleteMany({});
    await Course.deleteMany({});

    console.log('Data destroyed!');
  } catch (error) {
    console.error('Error destroying data:', error);
  }
};

// Run appropriate function based on command-line argument
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
