import React from 'react';
import { useClock } from '../hooks/useClock';

/**
 * Clock Component - Sử dụng Custom Hook useClock (Function Component)
 */
function Clock() {
  const { formattedTime, formattedDate } = useClock();

  return (
    <div className="clock-badge">
      <span className="clock-icon">⏰</span>
      <div className="clock-content">
        <div className="clock-time">{formattedTime}</div>
        <div className="clock-date">{formattedDate}</div>
      </div>
    </div>
  );
}

export default Clock;
