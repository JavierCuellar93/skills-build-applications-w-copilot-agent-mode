import { useEffect, useMemo, useState } from 'react';
import { buildApiUrl } from '../utils/api.js';

const teamsEndpoint = '/api/teams/';

function Teams() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const response = await fetch(buildApiUrl(teamsEndpoint));
        const payload = await response.json();
        const data = Array.isArray(payload) ? payload : payload.items ?? payload.results ?? [];
        setItems(data);
      } catch (err) {
        setError(err.message || 'Unable to load teams.');
      } finally {
        setLoading(false);
      }
    };

    loadTeams();
  }, []);

  const rows = useMemo(() => items.slice(0, 6), [items]);

  if (loading) return <p className="text-muted">Loading teams…</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 mb-3">Teams</h2>
        <ul className="list-group">
          {rows.map((team, index) => (
            <li className="list-group-item" key={team._id || team.id || `${team.name}-${index}`}>
              <strong>{team.name || 'Unnamed team'}</strong>
              <div className="text-muted small">{team.sport || team.status || 'No details available'}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Teams;
