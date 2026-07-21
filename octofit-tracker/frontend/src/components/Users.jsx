import { useEffect, useState } from 'react';
import { fetchCollection } from '../lib/api';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCollection('users')
      .then(setUsers)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Users</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <ul className="list-group">
        {users.map((user) => (
          <li key={user._id || user.id} className="list-group-item">
            <strong>{user.name}</strong> — {user.email} ({user.role})
          </li>
        ))}
      </ul>
    </section>
  );
}
