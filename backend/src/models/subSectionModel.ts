import { model, Schema, Document } from "mongoose";

// Define the SubSection interface
interface ISubSection extends Document {
  title: string;
  timeDuration: string;
  description: string;
  videoUrl: string;
  addtionalUrls: string[];
}

// Define the SubSection schema
const subSectionSchema = new Schema<ISubSection>({
  title: { type: String, required: true, trim: true },
  timeDuration: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  videoUrl: { type: String, required: true, trim: true },
  addtionalUrls: [{ type: String }]
});

const SubSection = model<ISubSection>("SubSection", subSectionSchema);

export default SubSection;
