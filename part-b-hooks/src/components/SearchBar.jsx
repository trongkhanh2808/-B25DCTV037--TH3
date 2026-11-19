import React, { useState, useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce';

// O tim kiem co debounce
function SearchBar({ onSearchChange }) {
  const [inputValue, setInputValue] = useState('');
  
  // Custom hook debounce 350ms
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
        <input
          type="text"
          className="search-input"
          placeholder="Tìm kiếm khoản chi theo tên..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        {inputValue && (
          <button
            type="button"
            className="search-clear-btn"
            onClick={handleClear}
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
