import React, { useState, useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce';

/**
 * SearchBar Component
 * Yêu cầu nâng cao: Ô tìm kiếm có độ trễ (debounce)
 */
function SearchBar({ onSearchChange }) {
  const [inputValue, setInputValue] = useState('');
  
  // Áp dụng custom hook useDebounce với độ trễ 350ms
  const debouncedValue = useDebounce(inputValue, 350);

  useEffect(() => {
    onSearchChange(debouncedValue);
  }, [debouncedValue, onSearchChange]);

  const handleClear = () => {
    setInputValue('');
  };

  return (
    <div className="search-bar-container">
      <div className="search-input-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder="Tìm kiếm khoản chi theo nội dung (có debounce 350ms)..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        {inputValue && (
          <button
            type="button"
            className="search-clear-btn"
            onClick={handleClear}
            title="Xóa tìm kiếm"
          >
            ✕
          </button>
        )}
      </div>

      {inputValue !== debouncedValue && (
        <span className="search-typing-indicator">Đang đợi gõ xong...</span>
      )}
    </div>
  );
}

export default SearchBar;
