import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getPokemonData } from '../../util/createCSV';
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

export interface Pokemon {
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
    getListOfthings: builder.query({
      queryFn: (ids) => {
        const promises = ids.map((id: string) => {
          return getPokemonData(`https://pokeapi.co/api/v2/pokemon/${id}`);
        });
        return Promise.all(promises).then((results) => {
          return { data: results };
        });
      },
    }),
  }),
});

export const {
  useGetPokemonByNameQuery,
  useGetPokemonListQuery,
  useGetListOfthingsQuery,
} = pokemonApi;
