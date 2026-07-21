import { useEffect, useMemo, useState } from 'react';
import { buildApiUrl } from '../utils/api.js';

const usersEndpoint = '/api/users/';

function Users() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetch(buildApiUrl(usersEndpoint));
        const payload = await response.json();
        const data = Array.isArray(payload) ? payload : payload.items ?? payload.results ?? [];
        setItems(data);
      } catch (err) {
        setError(err.message || 'Unable to load users.');
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const rows = useMemo(() => items.slice(0, 6), [items]);

  if (loading) return <p className="text-muted">Loading users…</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 mb-3">Users</h2>
        <ul className="list-group">
          {rows.map((user, index) => (
            <li className="list-group-item" key={user._id || user.id || `${user.name}-${index}`}>
              <strong>{user.name || user.username || 'Unknown user'}</strong>
              <div className="text-muted small">{user.role || user.email || 'No role available'}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Users;
