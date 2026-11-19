import React from 'react';
import Clock from './Clock';
import { useTheme } from '../context/ThemeContext';

function Header({ showClock, onToggleClock, onOpenApiConfig }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="app-header">
      <div className="header-brand">
        <div className="brand-icon">⚡</div>
        <div>
          <h1>Sổ Chi Tiêu Cá Nhân</h1>
          <p className="badge-hooks">Phần B &bull; Function Component + Hooks</p>
        </div>
      </div>

      <div className="header-actions">
        {/* Nút chuyển chế độ Sáng / Tối (Dùng useContext) */}
        <button
          type="button"
          className="btn-theme-toggle"
          onClick={toggleTheme}
          title={`Chuyển sang chế độ ${theme === 'light' ? 'Tối (Dark)' : 'Sáng (Light)'}`}
        >
          {theme === 'light' ? '🌙 Chế độ Tối' : '☀️ Chế độ Sáng'}
        </button>

        {/* Nút cấu hình MockAPI */}
        <button
          type="button"
          className="btn-config-api"
          onClick={onOpenApiConfig}
          title="Xem & cấu hình URL MockAPI"
        >
          🌐 Cấu hình API
        </button>

        {/* Nút ẩn / hiện đồng hồ */}
        <button
          type="button"
          className="btn-toggle-clock"
          onClick={onToggleClock}
          title={showClock ? 'Ẩn đồng hồ để kích hoạt cleanup useEffect' : 'Hiện đồng hồ'}
        >
          {showClock ? 'Ẩn đồng hồ' : 'Hiện đồng hồ'}
        </button>

        {showClock && <Clock />}
      </div>
    </header>
  );
}

export default Header;
