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
    // Chay moi giay
    this.timerId = setInterval(() => {
      this.setState({ currentTime: new Date() });
    }, 1000);
  }

  componentWillUnmount() {
    // Dung dong ho khi bi an tranh memory leak
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }

  render() {
    const { currentTime } = this.state;
    const timeStr = currentTime.toLocaleTimeString('vi-VN');
    const dateStr = currentTime.toLocaleDateString('vi-VN');

    return (
      <div className="clock-box">
        <span className="clock-time">{timeStr}</span>
        <span className="clock-date">{dateStr}</span>
      </div>
    );
  }
}

export default Clock;
