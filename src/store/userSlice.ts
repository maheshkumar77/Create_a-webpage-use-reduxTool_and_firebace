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
const initialState: FormData = {
  id: 0,           // Initialize `id` as a number (0 or some other default number)
  name: '',
  email: '',
  phone: '',
  address: '',
};

// Create a slice
const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    // Action to store form data
    setFormData: (state, action: PayloadAction<FormData>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.address = action.payload.address;
    },
  },
});

// Export actions
export const { setFormData } = formSlice.actions;

// Export the reducer
export default formSlice.reducer;
