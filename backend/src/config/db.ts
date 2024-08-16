import { connect } from "mongoose";

const connectDb = async () => {
  try {
    const connection = await connect(`${process.env.MONGO_URL}`);
    console.log(`Connected to database: ${connection.connection.host}`);
  } catch (error) {
    console.log(`{Error during MongoDB connection: ${error}`);
  }
};

export default connectDb;
