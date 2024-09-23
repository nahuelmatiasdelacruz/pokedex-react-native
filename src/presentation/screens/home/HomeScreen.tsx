import { View } from "react-native"
import { Text } from "react-native-paper";
import { getPokemons } from "../../../actions/pokemons";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { PokeballBg } from "../../components/ui/PokeballBg";
import { homeScreenStyles } from "../../styles/screens/homeScreen.styles";
import { FlatList } from "react-native-gesture-handler";
import { globalStyles } from "../../styles/global.styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PokemonCard } from "../../components/pokemons/PokemonCard";

export const HomeScreen = () => {
  const { top } = useSafeAreaInsets();
  const queryClient = useQueryClient();
  const { isLoading, data, fetchNextPage } = useInfiniteQuery({
    queryKey: ['pokemons','infinite'],
    initialPageParam: 0,
    staleTime: 1000 * 60 * 60,
    queryFn: async (params)=>{
      const pokemons = await getPokemons(params.pageParam);
      pokemons.forEach((pokemon)=>{
        queryClient.setQueryData(['pokemon',pokemon.id],pokemon);
      });
      return pokemons;
    },
    getNextPageParam: (lastPage, pages) => pages.length,
    
  })
  
  return (
    <View style={globalStyles.globalMargin}>
      <PokeballBg style={homeScreenStyles.imgPosition}/>
      <FlatList
        style={{paddingTop: top + 20}}
        data={data?.pages.flat() ?? []}
        keyExtractor={(pokemon,index) => `${pokemon.id}-${index}`}
        numColumns={2}
        ListHeaderComponent={()=>(
          <Text variant='displayMedium'>Pokedex</Text>
        )}
        onEndReachedThreshold={0.6}
        onEndReached={()=>fetchNextPage()}
        renderItem={({item})=><PokemonCard pokemon={item}/>}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};