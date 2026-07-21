import mongoose, { Schema, type Document, type Model } from 'mongoose';

export interface IActivity extends Document {
  type: string;
  duration: number;
  calories: number;
  date: Date;
}

const activitySchema = new Schema<IActivity>({
  type: { type: String, required: true },
  duration: { type: Number, required: true },
  calories: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

export const ActivityModel: Model<IActivity> = mongoose.model<IActivity>('Activity', activitySchema);
