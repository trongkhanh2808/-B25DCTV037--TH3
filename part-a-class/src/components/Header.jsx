import React, { Component } from 'react';
import Clock from './Clock';

class Header extends Component {
  render() {
    const { showClock, onToggleClock } = this.props;

    return (
      <header className="app-header">
        <div className="header-brand">
          <div className="brand-icon">💰</div>
          <div>
            <h1>Sổ Chi Tiêu Cá Nhân</h1>
            <p className="badge-class">Phần A &bull; React Class Component</p>
          </div>
        </div>

        <div className="header-actions">
          <button
            type="button"
            className="btn-toggle-clock"
            onClick={onToggleClock}
            title={showClock ? 'Ẩn đồng hồ để kích hoạt componentWillUnmount' : 'Hiện đồng hồ để kích hoạt componentDidMount'}
          >
            {showClock ? 'Ẩn đồng hồ' : 'Hiện đồng hồ'}
          </button>
          {showClock && <Clock />}
        </div>
      </header>
    );
  }
}

export default Header;
