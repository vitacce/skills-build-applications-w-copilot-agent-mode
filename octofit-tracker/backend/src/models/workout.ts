import mongoose, { Schema, type Document, type Model } from 'mongoose';

export interface IWorkout extends Document {
  title: string;
  difficulty: string;
  duration: number;
}

const workoutSchema = new Schema<IWorkout>({
  title: { type: String, required: true },
  difficulty: { type: String, required: true },
  duration: { type: Number, required: true },
});

export const WorkoutModel: Model<IWorkout> = mongoose.model<IWorkout>('Workout', workoutSchema);
