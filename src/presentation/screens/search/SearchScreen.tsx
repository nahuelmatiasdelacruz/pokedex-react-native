import { FlatList, View } from "react-native"
import { globalStyles } from "../../styles/global.styles"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { ActivityIndicator, Text, TextInput } from "react-native-paper";
import { Pokemon } from "../../../domain/entities/pokemon";
import { PokemonCard } from "../../components/pokemons/PokemonCard";
import { useQuery } from "@tanstack/react-query";
import { getPokemonNamesWithId, getPokemonsByIds } from "../../../actions/pokemons";
import { useMemo, useState } from "react";
import { FullScreenLoader } from "../../components/ui/FullScreenLoader";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";

export const SearchScreen = () => {
  const { top } = useSafeAreaInsets();
  const [term,setTerm] = useState<string>('');
  const debouncedValue = useDebouncedValue(term);
  const { isLoading, data: pokemonsList = []} = useQuery({
    queryKey: ['pokemons','all'],
    queryFn: () => getPokemonNamesWithId()
  });

  const pokemonNamesIdList = useMemo(()=>{
    if(!isNaN(Number(debouncedValue))){
      const pokemon = pokemonsList.find(pokemon=>pokemon.id === Number(debouncedValue));
      return pokemon ? [pokemon] : [];
    }
    if(debouncedValue.length === 0) return [];
    if(debouncedValue.length < 3) return [];
    return pokemonsList.filter((pokemon)=>pokemon.name.toLowerCase().includes(debouncedValue.toLowerCase()));
  },[debouncedValue]);

  if(isLoading){
    return <FullScreenLoader/>
  }

  const { isLoading: isLoadingPokemons, data: pokemons = []} = useQuery({
    queryKey: ['pokemons','by',pokemonNamesIdList],
    queryFn: () => getPokemonsByIds(pokemonNamesIdList.map((pokemon)=>pokemon.id)),
    staleTime: 1000 * 60 * 5
  })

  return (
    <View style={[globalStyles.globalMargin,{paddingTop: top}]}>
      <TextInput
        placeholder='Buscar pokemon'
        mode='flat'
        autoFocus
        autoCorrect={false}
        value={term}
        onChangeText={setTerm}
      />
      {
        isLoadingPokemons && <ActivityIndicator style={{paddingTop: 20}}/>
      }
      <FlatList
        style={{paddingTop: top + 20}}
        data={pokemons}
        keyExtractor={(pokemon,index) => `${pokemon.id}-${index}`}
        numColumns={2}
        renderItem={({item})=><PokemonCard pokemon={item}/>}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{height: 120}}/>}
      />
    </View>
  );
};