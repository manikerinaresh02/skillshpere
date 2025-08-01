import React from 'react';

const Test = () => {
  return (
    <div style={{ padding: '20px', backgroundColor: 'white', color: 'black' }}>
      <h1>Test Page</h1>
      <p>If you can see this, the React app is working!</p>
      <p>Current time: {new Date().toLocaleString()}</p>
    </div>
  );
};

export default Test; 