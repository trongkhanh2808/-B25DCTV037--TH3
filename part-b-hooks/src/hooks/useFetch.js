import { useState, useEffect, useCallback } from 'react';
import { initialExpenses } from '../data/initialExpenses';

const DEFAULT_API_URL = import.meta.env.VITE_API_URL || '/api/expenses';

/**
 * Custom hook useFetch
 * Yêu cầu: Lấy, thêm, xóa dữ liệu qua mockapi bằng custom hook useFetch; có trạng thái đang tải và lỗi.
 */
export function useFetch(initialUrl = DEFAULT_API_URL) {
  const [apiUrl, setApiUrl] = useState(initialUrl);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hàm tải dữ liệu (GET)
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`Lỗi máy chủ: HTTP ${response.status} ${response.statusText}`);
      }
      const json = await response.json();
      setData(Array.isArray(json) ? json : []);
    } catch (err) {
      console.warn('[useFetch] Không thể kết nối API:', err.message);
      setError(`Không thể tải dữ liệu từ API (${err.message}). Đang sử dụng bộ nhớ tạm cục bộ.`);
      
      // Fallback lấy từ localStorage nếu có, hoặc dùng dữ liệu ban đầu
      const local = localStorage.getItem('expenses_fallback');
      if (local) {
        try {
          setData(JSON.parse(local));
        } catch {
          setData(initialExpenses);
        }
      } else {
        setData(initialExpenses);
      }
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  // Tự động fetch khi apiUrl thay đổi hoặc khi component mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Cập nhật localStorage dự phòng khi data thay đổi
  useEffect(() => {
    if (data && data.length > 0) {
      localStorage.setItem('expenses_fallback', JSON.stringify(data));
    }
  }, [data]);

  // Hàm thêm dữ liệu (POST)
  const addExpense = useCallback(
    async (newExpense) => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newExpense)
        });

        if (!response.ok) {
          throw new Error(`Lỗi khi thêm: HTTP ${response.status}`);
        }

        const createdItem = await response.json();
        const itemToAdd = createdItem.id ? createdItem : { ...newExpense, id: String(Date.now()) };

        setData((prev) => [itemToAdd, ...prev]);
        return { success: true, data: itemToAdd };
      } catch (err) {
        console.warn('[useFetch] Lỗi khi thêm qua API:', err.message);
        setError(`Thao tác thêm vào API thất bại (${err.message}). Khoản chi đã được lưu vào bộ nhớ tạm.`);
        
        // Vẫn cập nhật local để người dùng trải nghiệm mượt mà
        const fallbackItem = { ...newExpense, id: 'local-' + Date.now() };
        setData((prev) => [fallbackItem, ...prev]);
        return { success: false, data: fallbackItem };
      } finally {
        setLoading(false);
      }
    },
    [apiUrl]
  );

  // Hàm xóa dữ liệu (DELETE)
  const deleteExpense = useCallback(
    async (id) => {
      setLoading(true);
      setError(null);

      try {
        const targetUrl = apiUrl.endsWith('/') ? `${apiUrl}${id}` : `${apiUrl}/${id}`;
        const response = await fetch(targetUrl, {
          method: 'DELETE'
        });

        if (!response.ok) {
          throw new Error(`Lỗi khi xóa: HTTP ${response.status}`);
        }

        setData((prev) => prev.filter((item) => String(item.id) !== String(id)));
        return { success: true };
      } catch (err) {
        console.warn('[useFetch] Lỗi khi xóa qua API:', err.message);
        setError(`Thao tác xóa trên API thất bại (${err.message}). Khoản chi đã được xóa khỏi bộ nhớ tạm.`);
        
        // Vẫn xóa trên local
        setData((prev) => prev.filter((item) => String(item.id) !== String(id)));
        return { success: false };
      } finally {
        setLoading(false);
      }
    },
    [apiUrl]
  );

  return {
    data,
    loading,
    error,
    apiUrl,
    setApiUrl,
    refetch: fetchData,
    addExpense,
    deleteExpense
  };
}

export default useFetch;
