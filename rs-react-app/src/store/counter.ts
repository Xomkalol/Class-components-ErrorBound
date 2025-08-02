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
      const pokemonUrl = action.payload;
      const index = state.urls.indexOf(pokemonUrl);
      if (index !== -1) {
        state.urls.splice(index, 1);
      } else {
        state.urls.push(action.payload);
      }
    },
  },
});

export const { addPokemon } = counterSlice.actions;

export default counterSlice.reducer;
