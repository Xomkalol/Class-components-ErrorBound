import { createSlice } from '@reduxjs/toolkit';

export interface savedPokemonState {
  urls: string[];
}

const initialState: savedPokemonState = {
  urls: [],
};

export const counterSlice = createSlice({
  name: 'pokemon counter',
  initialState,
  reducers: {
    addPokemon: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.urls.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addPokemon } = counterSlice.actions;

export default counterSlice.reducer;
