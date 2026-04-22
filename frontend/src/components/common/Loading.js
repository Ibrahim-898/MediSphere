// filepath: src/components/common/Loading.js
import React from 'react';

const Loading = ({ text = 'Loading...' }) => {
  return (
    <div className="loading-page">
      <div className="loading-spinner"></div>
      <p className="loading-text">{text}</p>
    </div>
  );
};

export default Loading;