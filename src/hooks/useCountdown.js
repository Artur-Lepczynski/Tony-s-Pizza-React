import { useEffect, useState } from "react";

export function useCountdown(target) {
  const [countDown, setCountDown] = useState(target - new Date().getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(target - new Date().getTime());
    }, 1000);

    // return () => clearInterval(interval);
  }, [target]);

  return {
    minutes: Math.floor(countDown / 1000 / 60),
    seconds: Math.floor((countDown / 1000) % 60),
  };
}
