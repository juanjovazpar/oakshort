import React from 'react';

const Loading: React.FC = () => (
  <div className="flex justify-center items-center w-full">
    <div className="flex space-x-1">
      {[0, 0.2, 0.4].map((delay, key) => (
        <div
          className="w-1 h-1 bg-blue-500 rounded-full animate-bounce opacity-75"
          style={{ animationDelay: `${delay}s` }}
          key={key}
        ></div>
      ))}
    </div>
  </div>
);

export default Loading;
