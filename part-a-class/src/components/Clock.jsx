import React, { Component } from 'react';

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: new Date()
    };
    this.timerId = null;
  }

  componentDidMount() {
    console.log('[Clock] Component mounted -> Bắt đầu đếm nhịp đồng hồ');
    this.timerId = setInterval(() => {
      this.setState({ currentTime: new Date() });
    }, 1000);
  }

  componentWillUnmount() {
    console.log('[Clock] Component will unmount -> Dọn dẹp timer clearInterval');
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  render() {
    const { currentTime } = this.state;
    const timeString = currentTime.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    const dateString = currentTime.toLocaleDateString('vi-VN', {
      weekday: 'long',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    return (
      <div className="clock-badge">
        <span className="clock-icon">⏰</span>
        <div className="clock-content">
          <div className="clock-time">{timeString}</div>
          <div className="clock-date">{dateString}</div>
        </div>
      </div>
    );
  }
}

export default Clock;
