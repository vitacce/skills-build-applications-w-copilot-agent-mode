"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const strict_1 = __importDefault(require("node:assert/strict"));
const server_1 = require("../server");
let server;
async function getJson(path) {
    if (!server) {
        server = await (0, server_1.startServer)();
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
    strict_1.default.ok(Array.isArray(users));
    const teams = await getJson('/api/teams/');
    strict_1.default.ok(Array.isArray(teams));
    const activities = await getJson('/api/activities/');
    strict_1.default.ok(Array.isArray(activities));
    const leaderboard = await getJson('/api/leaderboard/');
    strict_1.default.ok(Array.isArray(leaderboard));
    const workouts = await getJson('/api/workouts/');
    strict_1.default.ok(Array.isArray(workouts));
    server?.close();
}
run().catch((error) => {
    server?.close();
    console.error(error);
    process.exit(1);
});
