import { useEffect, useState } from 'react';
import { fetchCollection } from '../lib/api';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCollection('teams')
      .then(setTeams)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Teams</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <ul className="list-group">
        {teams.map((team) => (
          <li key={team._id || team.id} className="list-group-item">
            <strong>{team.name}</strong> — {team.members} members • {team.sport}
          </li>
        ))}
      </ul>
    </section>
  );
}
