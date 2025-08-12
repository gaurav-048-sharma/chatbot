// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice.js";

// Load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("counterState");
    if (serializedState === null) {
      return undefined; // use default
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.log(err)
    return undefined;
  }
};

// Save state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("counterState", serializedState);
  } catch {
    // ignore write errors
  }
};

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
  preloadedState: loadState(),
});

// Save to localStorage on every change
store.subscribe(() => {
  saveState({
    counter: store.getState().counter,
  });
});

export default store;

