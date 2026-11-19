import { useState, useEffect } from 'react';
import { initialExpenses } from '../data/initialExpenses';

// Endpoint mockapi (ho tro local mock hoac link mockapi.io)
const API_URL = '/api/expenses';

export function useFetch() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Lay du lieu tu mockapi
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Khong the lay du lieu tu server');
      const json = await res.json();
      setData(json);
    } catch (err) {
      setError(err.message);
      // Dung data mau neu api loi
      setData(initialExpenses);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Them khoan chi
  const addExpense = async (item) => {
    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
      const created = await res.json();
      setData((prev) => [created, ...prev]);
    } catch (err) {
      // Neu loi thi them truc tiep vao state
      const fallback = { ...item, id: Date.now().toString() };
      setData((prev) => [fallback, ...prev]);
    } finally {
      setLoading(false);
    }
  };

  // Xoa khoan chi
  const deleteExpense = async (id) => {
    setLoading(true);
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      setData((prev) => prev.filter((e) => String(e.id) !== String(id)));
    } catch (err) {
      setData((prev) => prev.filter((e) => String(e.id) !== String(id)));
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    addExpense,
    deleteExpense
  };
}

export default useFetch;
