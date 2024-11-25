import React, { useState, useEffect } from 'react';

interface IErrorBoundary {
  children?: any;
}

const ErrorBoundary: React.FC<IErrorBoundary> = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = (event: any) => {
      console.error('Error caught in ErrorBoundary:', event.error);
      setHasError(true);
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleError);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleError);
    };
  }, []);

  if (hasError) {
    return <h1>Something went wrong. Please try again later.</h1>;
  }

  return children;
};

export default ErrorBoundary;
