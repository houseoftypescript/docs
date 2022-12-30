import LinearProgress from '@mui/material/LinearProgress';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

const LoadingBar: React.FC = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleStart = (url: string) => {
      setLoading(true);
      setProgress(25);
    };

    const handleComplete = (url: string) => {
      setProgress(100);
      setTimeout(() => {
        setLoading(false);
      });
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  });

  return (
    loading && (
      <div className="fixed z-50 w-screen bg-white opacity-95">
        <LinearProgress variant="indeterminate" value={progress} />
      </div>
    )
  );
};

export default LoadingBar;
