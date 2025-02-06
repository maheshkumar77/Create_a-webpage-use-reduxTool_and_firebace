import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define an interface for the form data
interface FormData {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
}

// Set initial state with correct types
const initialState: FormData[] = [];  // Change to an array of objects

// Create a slice
const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    // Action to store form data
    setFormData: (state, action: PayloadAction<FormData>) => {
      // Add new form data with a unique id
      const newFormData = {
        ...action.payload,
        id: state.length > 0 ? state[state.length - 1].id + 1 : 1, // Increment the id based on previous state
      };
      state.push(newFormData);  // Push new data into the state array

      // Log the current state after each update
      console.log('Updated form data:', state);
    },
  },
});

// Export actions
export const { setFormData } = formSlice.actions;

// Export the reducer
export default formSlice.reducer;
