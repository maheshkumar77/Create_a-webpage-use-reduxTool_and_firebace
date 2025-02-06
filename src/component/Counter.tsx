// src/components/Counter.tsx
import React, { useState } from 'react';
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import './Counter.css';

const Counter: React.FC = () => {
  
  const [count, setCount] = useState<number>(0);


  const increment = () => setCount(count + 1);

  const decrement = () => setCount(count - 1);

  
  const reset = () => setCount(0);


  const backgroundColor = `rgb(${Math.min(count * 10, 255)}, ${Math.min(count * 5, 255)}, ${Math.min(count * 3, 255)})`;

  return (
    <div className='counter-main'>
          <div className="counter-container" style={{ background: `linear-gradient(135deg, ${backgroundColor}, #fff)` }}>
      <div className="counter-box">
        <h1 className="counter-title">Counter: {count}</h1>
        <div className="counter-buttons">
          <button className="btn increment" onClick={increment}>
            <CiSquarePlus />
          </button>
          <button className="btn reset" onClick={reset}>
            Reset
          </button>
          <button className="btn decrement" onClick={decrement}>
            <CiSquareMinus />
          </button>
        </div>
      </div>
    </div>
    </div>

  );
};

export default Counter;
