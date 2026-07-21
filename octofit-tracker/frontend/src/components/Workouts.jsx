import { useEffect, useMemo, useState } from 'react';
import { buildApiUrl } from '../utils/api.js';

const workoutsEndpoint = '/api/workouts/';

function Workouts() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const response = await fetch(buildApiUrl(workoutsEndpoint));
        const payload = await response.json();
        const data = Array.isArray(payload)
          ? payload
          : payload.items ?? payload.results ?? payload.data ?? [];
        setItems(data);
      } catch (err) {
        setError(err.message || 'Unable to load workouts.');
      } finally {
        setLoading(false);
      }
    };

    loadWorkouts();
  }, []);

  const rows = useMemo(() => items.slice(0, 6), [items]);

  if (loading) return <p className="text-muted">Loading workouts…</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 mb-3">Workouts</h2>
        <ul className="list-group">
          {rows.map((workout, index) => (
            <li className="list-group-item" key={workout._id || workout.id || `${workout.name}-${index}`}>
              <strong>{workout.name || 'Workout'}</strong>
              <div className="text-muted small">Focus: {workout.focus || 'general'}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Workouts;
