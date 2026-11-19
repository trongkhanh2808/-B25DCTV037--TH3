import React from 'react';
import { useClock } from '../hooks/useClock';

function Clock() {
  const { formattedTime, formattedDate } = useClock();

  return (
    <div className="clock-box">
      <span className="clock-time">{formattedTime}</span>
      <span className="clock-date">{formattedDate}</span>
    </div>
  );
}

export default Clock;
