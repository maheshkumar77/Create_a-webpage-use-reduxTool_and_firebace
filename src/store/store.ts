// store.ts
import { configureStore } from '@reduxjs/toolkit';
import formReducer from './userSlice'; // Import the form slice

const Store = configureStore({
  reducer: {
    form: formReducer, // Add the form slice reducer to the store
  },
});

export default Store; // Default export
