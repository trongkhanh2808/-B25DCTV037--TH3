import { useState, useEffect } from 'react';

// Custom hook dong ho dem gio
export function useClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const formattedTime = time.toLocaleTimeString('vi-VN');
  const formattedDate = time.toLocaleDateString('vi-VN');

  return { time, formattedTime, formattedDate };
}

export default useClock;
