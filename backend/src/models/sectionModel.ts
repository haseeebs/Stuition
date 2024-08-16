import { model, Schema } from "mongoose";

const sectionSchema = new Schema({
  sectionName: { type: String, required: true },
  subSection: [{ type: Schema.Types.ObjectId, ref: "SubSection", required: true }],
});

const Section = model("Section", sectionSchema);

export default Section;
