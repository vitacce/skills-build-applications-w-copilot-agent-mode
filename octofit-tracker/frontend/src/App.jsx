import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card shadow-sm border-0">
            <div className="card-body p-5">
              <p className="text-uppercase text-primary fw-semibold">OctoFit Tracker</p>
              <h1 className="display-5 fw-bold mb-3">Train smarter with a modern fitness platform</h1>
              <p className="lead text-muted mb-4">
                Track workouts, manage teams, and keep your progress visible in one place.
              </p>
              <p className="text-muted small mb-4">
                Set VITE_CODESPACE_NAME in your .env.local file to enable Codespaces API URLs. If it is not set, the app falls back to localhost.
              </p>
              <nav className="nav nav-pills flex-wrap gap-2 mb-4">
                <Link className="nav-link btn btn-outline-primary" to="/">Home</Link>
                <Link className="nav-link btn btn-outline-primary" to="/users">Users</Link>
                <Link className="nav-link btn btn-outline-primary" to="/teams">Teams</Link>
                <Link className="nav-link btn btn-outline-primary" to="/activities">Activities</Link>
                <Link className="nav-link btn btn-outline-primary" to="/leaderboard">Leaderboard</Link>
                <Link className="nav-link btn btn-outline-primary" to="/workouts">Workouts</Link>
              </nav>
              <Routes>
                <Route path="/" element={<div className="d-flex gap-3 flex-wrap"><span className="badge bg-success-subtle text-success">React 19</span><span className="badge bg-info-subtle text-info">Express + TypeScript</span><span className="badge bg-warning-subtle text-warning">MongoDB + Mongoose</span></div>} />
                <Route path="/users" element={<Users />} />
                <Route path="/teams" element={<Teams />} />
                <Route path="/activities" element={<Activities />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/workouts" element={<Workouts />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
