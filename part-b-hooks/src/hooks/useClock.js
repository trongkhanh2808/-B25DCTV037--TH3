import { useState, useEffect } from 'react';

/**
 * Custom hook useClock - Quản lý đồng hồ thời gian thực
 * Yêu cầu nâng cao: tách logic đồng hồ thành custom hook
 */
export function useClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    console.log('[useClock] Bắt đầu interval đếm nhịp');
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Cleanup function khi component unmount
    return () => {
      console.log('[useClock] Dọn dẹp interval clearInterval');
      clearInterval(timerId);
    };
  }, []);

  const formattedTime = time.toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  const formattedDate = time.toLocaleDateString('vi-VN', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  return { time, formattedTime, formattedDate };
}

export default useClock;
