import { useEffect, useState } from 'react';
import { fetchCollection } from '../lib/api';

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCollection('leaderboard')
      .then(setEntries)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Leaderboard</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <ul className="list-group">
        {entries.map((entry) => (
          <li key={entry._id || entry.rank} className="list-group-item">
            <strong>#{entry.rank}</strong> {entry.name} — {entry.score} pts
          </li>
        ))}
      </ul>
    </section>
  );
}
