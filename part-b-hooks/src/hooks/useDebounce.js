import { useState, useEffect } from 'react';

/**
 * Custom hook useDebounce - Trì hoãn cập nhật giá trị
 * Yêu cầu nâng cao: ô tìm kiếm có độ trễ (debounce) để tránh tính toán liên tục
 * @param {*} value - Giá trị cần debounce
 * @param {number} delay - Thời gian trễ tính bằng ms (mặc định 350ms)
 */
export function useDebounce(value, delay = 350) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Dọn dẹp timeout nếu value thay đổi trước khi delay kết thúc
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
