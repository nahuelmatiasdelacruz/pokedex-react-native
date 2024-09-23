import { pokeApi } from "../../config/api/pokeApi";
import type { Pokemon } from "../../domain/entities/pokemon";
import type { PokeAPIPaginatedResponse, PokeAPIPokemon } from "../../infrastructure/interfaces/pokeapi.interfaces";
import { PokemonMapper } from "../../infrastructure/mappers/pokemon.mapper";

export const getPokemons = async (page: number, limit: number = 20): Promise<Pokemon[]> => {
  try{
    const url = `/pokemon?offset=${page * 10}&limit=${limit}`;
    const { data } = await pokeApi.get<PokeAPIPaginatedResponse>(url);
    const pokemonPromises = data.results.map((info)=>{
      return pokeApi.get<PokeAPIPokemon>(info.url);
    });
    const pokeApiPokemons = await Promise.all(pokemonPromises);
    const pokemonsPromises = pokeApiPokemons.map((pokemon)=>PokemonMapper.pokeApiPokemonToEntity(pokemon.data));
    return await Promise.all(pokemonsPromises);
  }catch(e){
    throw new Error(`Error: No se pudo obtener los pokemons: ${e}`);
  }
}