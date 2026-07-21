import express from 'express';
import type { Server } from 'node:http';
import dotenv from 'dotenv';
import { UserModel } from './models/user';
import { TeamModel } from './models/team';
import { ActivityModel } from './models/activity';
import { LeaderboardModel } from './models/leaderboard';
import { WorkoutModel } from './models/workout';
import { connectDatabase } from './config/database';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'octofit-backend', apiBaseUrl });
});

app.get('/api/users/', async (_req, res) => {
  const users = await UserModel.find({}).lean();
  res.json(users);
});

app.get('/api/teams/', async (_req, res) => {
  const teams = await TeamModel.find({}).lean();
  res.json(teams);
});

app.get('/api/activities/', async (_req, res) => {
  const activities = await ActivityModel.find({}).lean();
  res.json(activities);
});

app.get('/api/leaderboard/', async (_req, res) => {
  const leaderboard = await LeaderboardModel.find({}).lean();
  res.json(leaderboard);
});

app.get('/api/workouts/', async (_req, res) => {
  const workouts = await WorkoutModel.find({}).lean();
  res.json(workouts);
});

export async function startServer(): Promise<Server> {
  try {
    await connectDatabase();
  } catch (error) {
    console.warn('MongoDB connection unavailable, continuing without database:', error);
  }

  return new Promise<Server>((resolve) => {
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
