import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { UserModel } from '../models/user';
import { TeamModel } from '../models/team';
import { ActivityModel } from '../models/activity';
import { LeaderboardModel } from '../models/leaderboard';
import { WorkoutModel } from '../models/workout';

dotenv.config();

// Seed the octofit_db database with test data
async function seed() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
  await mongoose.connect(uri);

  await Promise.all([
    UserModel.deleteMany({}),
    TeamModel.deleteMany({}),
    ActivityModel.deleteMany({}),
    LeaderboardModel.deleteMany({}),
    WorkoutModel.deleteMany({}),
  ]);

  const users = await UserModel.insertMany([
    { name: 'Ava Patel', email: 'ava@example.com', role: 'admin' },
    { name: 'Noah Kim', email: 'noah@example.com', role: 'member' },
    { name: 'Mia Chen', email: 'mia@example.com', role: 'coach' },
  ]);

  const teams = await TeamModel.insertMany([
    { name: 'River Runners', members: 4, sport: 'running' },
    { name: 'Peak Striders', members: 6, sport: 'cycling' },
  ]);

  const activities = await ActivityModel.insertMany([
    { type: 'run', duration: 30, calories: 320 },
    { type: 'strength', duration: 45, calories: 260 },
    { type: 'swim', duration: 25, calories: 210 },
  ]);

  const leaderboard = await LeaderboardModel.insertMany([
    { rank: 1, name: 'Ava Patel', score: 980 },
    { rank: 2, name: 'Noah Kim', score: 910 },
    { rank: 3, name: 'Mia Chen', score: 890 },
  ]);

  const workouts = await WorkoutModel.insertMany([
    { title: 'Morning Run', difficulty: 'easy', duration: 30 },
    { title: 'Core Circuit', difficulty: 'moderate', duration: 40 },
    { title: 'Interval Sprint', difficulty: 'hard', duration: 20 },
  ]);

  console.log('Seeded users, teams, activities, leaderboard, workouts', {
    users: users.length,
    teams: teams.length,
    activities: activities.length,
    leaderboard: leaderboard.length,
    workouts: workouts.length,
  });

  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error('Seed failed', error);
  process.exit(1);
});
