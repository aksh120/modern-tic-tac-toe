import { useState, useEffect, useCallback } from 'react';

export const useGameTimer = (startTime: number) => {
  const [elapsedTime, setElapsedTime] = useState('00:00');

  const formatTime = useCallback((ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }, []);

  useEffect(() => {
    const updateTimer = () => {
      const elapsed = Date.now() - startTime;
      setElapsedTime(formatTime(elapsed));
    };

    const interval = setInterval(updateTimer, 1000);
    updateTimer();

    return () => clearInterval(interval);
  }, [startTime, formatTime]);

  return elapsedTime;
};