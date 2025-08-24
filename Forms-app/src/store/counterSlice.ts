import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store/store';

export interface FormState {
  name: string;
  age: string;
  email: string;
  password: string;
  terms: string;
  gender: string;
  country: string;
}

const initialState: FormState = {
  name: '',
  age: '',
  email: '',
  password: '',
  terms: '',
  gender: '',
  country: '',
};

export const formSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<FormState>) => {
      return action.payload;
    },
  },
});

export const { setFormData } = formSlice.actions;

export const selectFormData = (state: { form: FormState }) => state.form;

export default formSlice.reducer;
