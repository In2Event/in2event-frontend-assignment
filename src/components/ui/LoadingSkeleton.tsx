import React from 'react';

const LoadingSkeleton = () => {
  return (
    <div className="animate-pulse" data-testid="loading-skeleton">
      <div className="h-4 bg-gray-200 mt-3 mb-6 rounded"></div>
      <div className="h-4 bg-gray-300 mb-6 rounded"></div>
      <div className="h-4 bg-gray-200 mb-6 rounded"></div>
      <div className="h-4 bg-gray-300 mb-6 rounded"></div>
      <div className="h-4 bg-gray-200 mb-6 rounded"></div>
    </div>
  );
};

export default LoadingSkeleton;