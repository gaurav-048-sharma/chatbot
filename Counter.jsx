// src/Counter.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, reset } from "./redux/counterSlice.js";

const Counter = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="text-center mt-10">
      <h1 className="text-4xl mb-4">Counter: {count}</h1>
      <div className="space-x-4">
        <button
          onClick={() => dispatch(increment())}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          +
        </button>
        <button
          onClick={() => dispatch(decrement())}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          -
        </button>
        <button
          onClick={() => dispatch(reset())}
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Counter;
