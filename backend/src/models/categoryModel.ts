import { model, Schema, Document } from "mongoose";

// Define the category interface
interface ICategory extends Document {
  name: string;
  description?: string;
}

// Define the category schema
const categorySchema = new Schema<ICategory>({
  name: { type: String, required: true, unique: true },
  description: { type: String },
});

const Category = model<ICategory>("Category", categorySchema);

export default Category;
