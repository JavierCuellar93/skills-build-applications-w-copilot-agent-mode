import { useEffect, useMemo, useState } from 'react';
import { buildApiUrl } from '../utils/api.js';

const leaderboardEndpoint = '/api/leaderboard/';

function Leaderboard() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const response = await fetch(buildApiUrl(leaderboardEndpoint));
        const payload = await response.json();
        const data = Array.isArray(payload) ? payload : payload.items ?? payload.results ?? [];
        setItems(data);
      } catch (err) {
        setError(err.message || 'Unable to load leaderboard.');
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboard();
  }, []);

  const rows = useMemo(() => items.slice(0, 6), [items]);

  if (loading) return <p className="text-muted">Loading leaderboard…</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 mb-3">Leaderboard</h2>
        <ul className="list-group">
          {rows.map((entry, index) => (
            <li className="list-group-item" key={entry._id || entry.id || `${entry.name}-${index}`}>
              <strong>{entry.rank || index + 1}. {entry.name || 'Unknown athlete'}</strong>
              <div className="text-muted small">Score: {entry.score ?? 'n/a'}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Leaderboard;
