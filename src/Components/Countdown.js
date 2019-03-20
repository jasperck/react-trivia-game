import React, { useState, useEffect } from 'react';
import { TitleWrapper } from './Head';

const Countdown = ({ time, timesUp }) => {
  const [countdown, updateCountdown] = useState(time);

  if (countdown < 0) {
    timesUp();
  }
  
  useEffect(() => {
    const timer = setTimeout(() => updateCountdown(countdown - 1), 1000)

    return () => clearTimeout(timer);
  }, [countdown])

  return (<TitleWrapper>{countdown}</TitleWrapper>);
};

export default Countdown;
