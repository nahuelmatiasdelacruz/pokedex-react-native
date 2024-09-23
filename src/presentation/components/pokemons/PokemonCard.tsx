import { PokemonCardProps } from "../../../infrastructure/interfaces/components/pokemons/PokemonCard.interface";
import { Card, Text } from "react-native-paper";
import { pokemonCardStyles } from "../../styles/components/pokemons/pokemon-card.styles";
import { Image, Pressable, View } from "react-native";
import { FadeInImage } from "../ui/FadeInImage";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParams } from "../../navigator/StackNavigator";

export const PokemonCard = ({pokemon}:PokemonCardProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  
  return (
    <Pressable style={{flex: 1}} onPress={()=>navigation.navigate('PokemonScreen',{pokemonId: pokemon.id, color: pokemon.color})}>
      <Card style={[pokemonCardStyles.cardContainer,{backgroundColor: pokemon.color}]}>
        <Text lineBreakMode='middle' variant='bodyLarge' style={pokemonCardStyles.name}>
          {pokemon.name}
          {'\n#' + pokemon.id}
        </Text>
        <View style={pokemonCardStyles.pokeballContainer}>
          <Image source={require('../../../assets/pokeball-light.png')} style={pokemonCardStyles.pokeball}/>
        </View>
        <FadeInImage uri={pokemon.avatar} style={pokemonCardStyles.pokemonImage}/>
        <Text style={[pokemonCardStyles.name,{
          marginTop: 35
        }]}>{pokemon.types[0]}</Text>
      </Card>
    </Pressable>
  );
};