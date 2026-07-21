"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = startServer;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = require("./models/user");
const team_1 = require("./models/team");
const activity_1 = require("./models/activity");
const leaderboard_1 = require("./models/leaderboard");
const workout_1 = require("./models/workout");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;
app.use(express_1.default.json());
app.get('/health', (_req, res) => {
    res.json({ status: 'ok', service: 'octofit-backend', apiBaseUrl });
});
app.get('/api/users/', async (_req, res) => {
    const users = await user_1.UserModel.find({}).lean();
    res.json(users);
});
app.get('/api/teams/', async (_req, res) => {
    const teams = await team_1.TeamModel.find({}).lean();
    res.json(teams);
});
app.get('/api/activities/', async (_req, res) => {
    const activities = await activity_1.ActivityModel.find({}).lean();
    res.json(activities);
});
app.get('/api/leaderboard/', async (_req, res) => {
    const leaderboard = await leaderboard_1.LeaderboardModel.find({}).lean();
    res.json(leaderboard);
});
app.get('/api/workouts/', async (_req, res) => {
    const workouts = await workout_1.WorkoutModel.find({}).lean();
    res.json(workouts);
});
async function startServer() {
    try {
        await mongoose_1.default.connect(mongoUri);
    }
    catch (error) {
        console.warn('MongoDB connection unavailable, continuing without database:', error);
    }
    return new Promise((resolve) => {
        const server = app.listen(port, '0.0.0.0', () => {
            console.log(`Backend listening on ${apiBaseUrl}`);
            resolve(server);
        });
    });
}
if (require.main === module) {
    startServer().catch((error) => {
        console.error('Failed to start server', error);
        process.exit(1);
    });
}
