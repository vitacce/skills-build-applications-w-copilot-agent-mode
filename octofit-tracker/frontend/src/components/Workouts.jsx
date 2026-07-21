import { useEffect, useState } from 'react';
import { fetchCollection } from '../lib/api';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCollection('workouts')
      .then(setWorkouts)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Workouts</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <ul className="list-group">
        {workouts.map((workout) => (
          <li key={workout._id || workout.id} className="list-group-item">
            <strong>{workout.title}</strong> — {workout.difficulty} • {workout.duration} min
          </li>
        ))}
      </ul>
    </section>
  );
}
