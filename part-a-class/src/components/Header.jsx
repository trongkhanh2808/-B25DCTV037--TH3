import React, { Component } from 'react';
import Clock from './Clock';

class Header extends Component {
  render() {
    const { showClock, onToggleClock } = this.props;

    return (
      <header className="app-header">
        <div className="header-title">
          <h1>Sổ Chi Tiêu Cá Nhân</h1>
          <span className="subtitle">Phần A - Class Component</span>
        </div>

        <div className="header-actions">
          <button type="button" className="btn-toggle" onClick={onToggleClock}>
            {showClock ? 'Ẩn đồng hồ' : 'Hiện đồng hồ'}
          </button>
          {showClock && <Clock />}
        </div>
      </header>
    );
  }
}

export default Header;
