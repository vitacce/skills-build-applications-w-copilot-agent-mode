import mongoose, { Schema, type Document, type Model } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  name: string;
  score: number;
  rank: number;
}

const leaderboardSchema = new Schema<ILeaderboardEntry>({
  name: { type: String, required: true },
  score: { type: Number, required: true },
  rank: { type: Number, required: true },
});

export const LeaderboardModel: Model<ILeaderboardEntry> = mongoose.model<ILeaderboardEntry>('LeaderboardEntry', leaderboardSchema);
