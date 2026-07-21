import assert from 'node:assert/strict';
import { startServer } from '../server';

let server: Awaited<ReturnType<typeof startServer>> | undefined;

async function getJson(path: string) {
  if (!server) {
    server = await startServer();
  }

  const address = server.address();
  if (!address || typeof address === 'string') {
    throw new Error('Server not listening');
  }

  const port = address.port;
  const response = await fetch(`http://127.0.0.1:${port}${path}`);
  return response.json();
}

async function run() {
  const users = await getJson('/api/users/');
  assert.ok(Array.isArray(users));

  const teams = await getJson('/api/teams/');
  assert.ok(Array.isArray(teams));

  const activities = await getJson('/api/activities/');
  assert.ok(Array.isArray(activities));

  const leaderboard = await getJson('/api/leaderboard/');
  assert.ok(Array.isArray(leaderboard));

  const workouts = await getJson('/api/workouts/');
  assert.ok(Array.isArray(workouts));

  server?.close();
}

run().catch((error) => {
  server?.close();
  console.error(error);
  process.exit(1);
});
