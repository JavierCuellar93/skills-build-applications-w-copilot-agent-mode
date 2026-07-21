import { useEffect, useMemo, useState } from 'react';
import { buildApiUrl } from '../utils/api.js';

const activitiesEndpoint = '/api/activities/';

function Activities() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const response = await fetch(buildApiUrl(activitiesEndpoint));
        const payload = await response.json();
        const data = Array.isArray(payload) ? payload : payload.items ?? payload.results ?? [];
        setItems(data);
      } catch (err) {
        setError(err.message || 'Unable to load activities.');
      } finally {
        setLoading(false);
      }
    };

    loadActivities();
  }, []);

  const rows = useMemo(() => items.slice(0, 6), [items]);

  if (loading) return <p className="text-muted">Loading activities…</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 mb-3">Activities</h2>
        <ul className="list-group">
          {rows.map((activity, index) => (
            <li className="list-group-item" key={activity._id || activity.id || `${activity.type}-${index}`}>
              <strong>{activity.type || 'Activity'}</strong>
              <div className="text-muted small">{activity.durationMinutes || activity.duration || 'No duration available'}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Activities;
