import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

interface PokemonForm {
  name: string;
  url: string;
}

interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
}

interface Pokemon {
  name: string;
  abilities: PokemonAbility[];
  forms: PokemonForm[];
  species: {
    name: string;
    url: string;
  };
  sprites: {
    front_default: string;
  };
}

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query<Pokemon, string>({
      query: (name) => `pokemon/${name}`,
      keepUnusedDataFor: 100000,
    }),
    getPokemonList: builder.query<PokemonListResponse, number>({
      query: (number) => `pokemon/?limit=20&offset=${number}`,
      keepUnusedDataFor: 100000,
    }),
  }),
});

export const { useGetPokemonByNameQuery, useGetPokemonListQuery } = pokemonApi;
