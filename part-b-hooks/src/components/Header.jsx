import React from 'react';
import Clock from './Clock';
import { useTheme } from '../context/ThemeContext';

function Header({ showClock, onToggleClock }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="app-header">
      <div className="header-title">
        <h1>Sổ Chi Tiêu Cá Nhân</h1>
        <span className="subtitle">Phần B - Function Component & Hooks</span>
      </div>

      <div className="header-actions">
        <button type="button" className="btn-toggle" onClick={toggleTheme}>
          {theme === 'light' ? 'Chế độ Tối' : 'Chế độ Sáng'}
        </button>

        <button type="button" className="btn-toggle" onClick={onToggleClock}>
          {showClock ? 'Ẩn đồng hồ' : 'Hiện đồng hồ'}
        </button>

        {showClock && <Clock />}
      </div>
    </header>
  );
}

export default Header;
