import React, { useState } from 'react';

function ApiConfigModal({ isOpen, onClose, currentApiUrl, onSaveApiUrl }) {
  const [inputUrl, setInputUrl] = useState(currentApiUrl);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    if (inputUrl.trim()) {
      onSaveApiUrl(inputUrl.trim());
      onClose();
    }
  };

  const handleUseLocalMock = () => {
    setInputUrl('/api/expenses');
    onSaveApiUrl('/api/expenses');
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <div className="modal-header">
          <h3>🌐 Cấu hình MockAPI URL</h3>
          <button type="button" className="btn-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSave}>
          <div className="modal-body">
            <p className="modal-description">
              Hệ thống hỗ trợ cả <strong>Local Mock API</strong> (tích hợp sẵn qua Vite server) lẫn URL từ{' '}
              <a href="https://mockapi.io" target="_blank" rel="noreferrer">
                mockapi.io
              </a>
              .
            </p>

            <div className="form-group">
              <label htmlFor="api-url-input">API Endpoint URL:</label>
              <input
                id="api-url-input"
                type="text"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                placeholder="https://66xxx.mockapi.io/api/v1/expenses hoặc /api/expenses"
                className="input-code"
              />
            </div>

            <div className="modal-presets">
              <span>Gợi ý:</span>
              <button
                type="button"
                className="preset-tag"
                onClick={handleUseLocalMock}
              >
                ⚡ Sử dụng Local Mock API (/api/expenses)
              </button>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Đóng
            </button>
            <button type="submit" className="btn btn-primary">
              Lưu & Áp dụng
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ApiConfigModal;
