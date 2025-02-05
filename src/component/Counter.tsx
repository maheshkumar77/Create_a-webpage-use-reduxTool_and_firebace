// src/components/Counter.tsx

import React, { useState } from 'react';

const Counter: React.FC = () => {
  // State for the count value
  const [count, setCount] = useState<number>(0);

  // Function to handle increment
  const increment = () => setCount(count + 1);

  // Function to handle decrement
  const decrement = () => setCount(count - 1);

  // Function to handle reset
  const reset = () => setCount(0);

  // Calculate the background color based on the count (linear progression)
  // We'll use a cubic bezier curve for smoothness
  const backgroundColor = `rgb(${Math.min(count * 10, 255)}, ${Math.min(count * 5, 255)}, ${Math.min(count * 3, 255)})`;

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '400px',
        borderRadius:'14px',
        background: `linear-gradient(135deg, ${backgroundColor}, #fff)`,
        transition: 'background-color 1s cubic-bezier(0.25, 0.8, 0.25, 1)',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem' }}>Counter: {count}</h1>
        <div style={{ margin: '20px' }}>
          <button
            onClick={increment}
            style={{ padding: '10px 20px', marginRight: '10px', fontSize: '1rem' }}
          >
            Increment
          </button>
          <button
            onClick={decrement}
            style={{ padding: '10px 20px', marginRight: '10px', fontSize: '1rem' }}
          >
            Decrement
          </button>
          <button
            onClick={reset}
            style={{ padding: '10px 20px', fontSize: '1rem' }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Counter;
