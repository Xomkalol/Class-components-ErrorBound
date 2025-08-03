import { createSlice } from '@reduxjs/toolkit';
export interface pokemonState {
  name: string;
  url: string;
}
export interface savedPokemonState {
  pokemons: pokemonState[];
}

const initialState: savedPokemonState = {
  pokemons: [],
};

export const counterSlice = createSlice({
  name: 'pokemon counter',
  initialState,
  reducers: {
    addPokemon: (state, action) => {
      const index = state.pokemons.findIndex(
        (p) => p.url === action.payload.url
      );
      if (index !== -1) {
        state.pokemons.splice(index, 1);
      } else {
        state.pokemons.push(action.payload);
      }
    },
    clearState: (state) => {
      state.pokemons = [];
    },
  },
});

export const { addPokemon, clearState } = counterSlice.actions;

export default counterSlice.reducer;
