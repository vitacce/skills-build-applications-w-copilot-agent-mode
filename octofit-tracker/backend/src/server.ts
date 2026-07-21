import express from 'express';
import mongoose from 'mongoose';
import type { Server } from 'node:http';

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

const users = [
  { id: 1, name: 'Ava', email: 'ava@example.com', role: 'admin' },
  { id: 2, name: 'Noah', email: 'noah@example.com', role: 'member' },
];

const teams = [
  { id: 1, name: 'River Runners', members: 4 },
  { id: 2, name: 'Peak Striders', members: 6 },
];

const activities = [
  { id: 1, type: 'run', duration: 30, calories: 320 },
  { id: 2, type: 'strength', duration: 45, calories: 260 },
];

const leaderboard = [
  { rank: 1, name: 'Ava', score: 980 },
  { rank: 2, name: 'Noah', score: 910 },
];

const workouts = [
  { id: 1, title: 'Morning Run', difficulty: 'easy' },
  { id: 2, title: 'Core Circuit', difficulty: 'moderate' },
];

app.get('/api/users/', (_req, res) => {
  res.json(users);
});

app.get('/api/teams/', (_req, res) => {
  res.json(teams);
});

app.get('/api/activities/', (_req, res) => {
  res.json(activities);
});

app.get('/api/leaderboard/', (_req, res) => {
  res.json(leaderboard);
});

app.get('/api/workouts/', (_req, res) => {
  res.json(workouts);
});

export async function startServer(): Promise<Server> {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/octofit');
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
