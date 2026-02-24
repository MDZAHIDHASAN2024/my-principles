import { useState, useEffect } from 'react';

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  image: string;
  address: string;
  isAdmin: boolean;
  isBanned: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Pagination {
  totalPages: number;
  currentPage: number;
  previousPage: number | null;
  nextPage: number | null;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

const Jannat = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          'https://brotherestore-3.onrender.com/api/users',
        );

        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`);
        }

        const data = await res.json();

        if (data.success) {
          setUsers(data.payload.users);
          setPagination(data.payload.pagination);
        } else {
          throw new Error(data.message || 'Data আনতে ব্যর্থ হয়েছে');
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'কিছু একটা সমস্যা হয়েছে',
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>লোড হচ্ছে...</div>;
  if (error) return <div>❌ Error: {error}</div>;

  return (
    <div>
      <h2>মোট ব্যবহারকারী: {users.length}</h2>

      {users.map((user) => (
        <div
          key={user._id}
          style={{ border: '1px solid #ccc', margin: '1rem', padding: '1rem' }}
        >
          <p>
            <strong>নাম:</strong> {user.name}
          </p>
          <p>
            <strong>ইমেইল:</strong> {user.email}
          </p>
          <p>
            <strong>ফোন:</strong> {user.phone}
          </p>
          <p>
            <strong>ঠিকানা:</strong> {user.address}
          </p>
          <p>
            <strong>Admin:</strong> {user.isAdmin ? 'হ্যাঁ' : 'না'}
          </p>
          <p>
            <strong>Banned:</strong> {user.isBanned ? 'হ্যাঁ' : 'না'}
          </p>
          <p>
            <strong>যোগদান:</strong>{' '}
            {new Date(user.createdAt).toLocaleDateString('bn-BD')}
          </p>
        </div>
      ))}

      {pagination && (
        <div>
          <p>
            পেজ: {pagination.currentPage} / {pagination.totalPages}
          </p>
        </div>
      )}
    </div>
  );
};

export default Jannat;
