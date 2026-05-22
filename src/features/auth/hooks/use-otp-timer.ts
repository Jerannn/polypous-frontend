import { useEffect, useState } from "react";

export default function useOtpTimer(initialExpiresAt: string | null = null) {
  const [countdown, setCountdown] = useState(0);
  const [expiresAt, setExpiresAt] = useState<string | null>(initialExpiresAt);

  useEffect(() => {
    if (!expiresAt) return;

    const expiry = new Date(expiresAt).getTime();

    // Instant initial calculation to prevent 1-second countdown lag/UI stutter
    const updateCountdown = () => {
      const remaining = expiry - Date.now();
      const seconds = Math.max(0, Math.floor(remaining / 1000));
      setCountdown(seconds);
      return seconds;
    };

    const initialRemaining = updateCountdown();
    if (initialRemaining <= 0) return;

    const countdownInterval = setInterval(() => {
      const remaining = updateCountdown();
      if (remaining <= 0) {
        clearInterval(countdownInterval);
      }
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [expiresAt]);

  return { countdown, setExpiresAt, isTimerActive: countdown > 0 };
}
