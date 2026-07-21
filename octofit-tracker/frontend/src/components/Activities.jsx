import { useEffect, useState } from 'react';
import { fetchCollection } from '../lib/api';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCollection('activities')
      .then(setActivities)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Activities</h2>
      {error ? <p className="text-danger">{error}</p> : null}
      <ul className="list-group">
        {activities.map((activity) => (
          <li key={activity._id || activity.id} className="list-group-item">
            <strong>{activity.type}</strong> — {activity.duration} min • {activity.calories} kcal
          </li>
        ))}
      </ul>
    </section>
  );
}
