"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = require("../models/user");
const team_1 = require("../models/team");
const activity_1 = require("../models/activity");
const leaderboard_1 = require("../models/leaderboard");
const workout_1 = require("../models/workout");
dotenv_1.default.config();
// Seed the octofit_db database with test data
async function seed() {
    const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
    await mongoose_1.default.connect(uri);
    await Promise.all([
        user_1.UserModel.deleteMany({}),
        team_1.TeamModel.deleteMany({}),
        activity_1.ActivityModel.deleteMany({}),
        leaderboard_1.LeaderboardModel.deleteMany({}),
        workout_1.WorkoutModel.deleteMany({}),
    ]);
    const users = await user_1.UserModel.insertMany([
        { name: 'Ava Patel', email: 'ava@example.com', role: 'admin' },
        { name: 'Noah Kim', email: 'noah@example.com', role: 'member' },
        { name: 'Mia Chen', email: 'mia@example.com', role: 'coach' },
    ]);
    const teams = await team_1.TeamModel.insertMany([
        { name: 'River Runners', members: 4, sport: 'running' },
        { name: 'Peak Striders', members: 6, sport: 'cycling' },
    ]);
    const activities = await activity_1.ActivityModel.insertMany([
        { type: 'run', duration: 30, calories: 320 },
        { type: 'strength', duration: 45, calories: 260 },
        { type: 'swim', duration: 25, calories: 210 },
    ]);
    const leaderboard = await leaderboard_1.LeaderboardModel.insertMany([
        { rank: 1, name: 'Ava Patel', score: 980 },
        { rank: 2, name: 'Noah Kim', score: 910 },
        { rank: 3, name: 'Mia Chen', score: 890 },
    ]);
    const workouts = await workout_1.WorkoutModel.insertMany([
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
    await mongoose_1.default.disconnect();
}
seed().catch((error) => {
    console.error('Seed failed', error);
    process.exit(1);
});
