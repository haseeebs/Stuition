import mongoose, { Schema, Document } from "mongoose";

// Interface for Course Reference
interface ICourseRef {
  _id: Schema.Types.ObjectId;
  category: Schema.Types.ObjectId;
}

// Interface for Viewed Course
interface IViewedCourse {
  courseId: ICourseRef; // Reference to a course, including category
  viewedAt: Date;
}

// Interface for User Activity
interface IUserActivity extends Document {
  _id: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  viewedCourses: IViewedCourse[];
}

const userActivitySchema = new Schema<IUserActivity>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  viewedCourses: [
    {
      courseId: { type: Schema.Types.ObjectId, ref: "Course" },
      viewedAt: { type: Date, default: Date.now },
    },
  ],
});

// Ensure unique courseId for the same userId
userActivitySchema.index({ userId: 1, "viewedCourses.courseId": 1 }, { unique: true });

const UserActivity = mongoose.model<IUserActivity>(
  "UserActivity",
  userActivitySchema
);


export default UserActivity;
