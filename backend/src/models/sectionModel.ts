import { model, Schema, Document } from "mongoose";

// Define the Section interface
interface ISection extends Document {
  sectionName: string;
  subSections: Schema.Types.ObjectId[];
}

// Define the Section schema
const sectionSchema = new Schema<ISection>({
  sectionName: { type: String, required: true, trim: true },
  subSections: [{ type: Schema.Types.ObjectId, ref: "SubSection", required: true }],
});

const Section = model<ISection>("Section", sectionSchema);

export default Section;
