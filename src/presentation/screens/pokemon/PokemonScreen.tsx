import {FlatList, Image, ScrollView, View} from 'react-native';
import {PokemonScreenProps} from '../../../infrastructure/interfaces/components/pokemons/PokemonScreen.interface';
import {useQuery} from '@tanstack/react-query';
import {getPokemonById} from '../../../actions/pokemons';
import {Chip, Text} from 'react-native-paper';
import {FullScreenLoader} from '../../components/ui/FullScreenLoader';
import {Formatter} from '../../../config/helpers/formatter';
import {FadeInImage} from '../../components/ui/FadeInImage';
import { pokemonScreenStyles } from '../../styles/screens/pokemonScreen.styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

export const PokemonScreen = ({navigation, route}: PokemonScreenProps) => {
  const { isDark } = useContext(ThemeContext);
  const { top } = useSafeAreaInsets();
  const { pokemonId, color } = route.params;

  const pokeballImg = isDark
    ? require('../../../assets/pokeball-light.png')
    : require('../../../assets/pokeball-dark.png')

  const {isLoading, data: pokemon} = useQuery({
    queryKey: ['pokemon', pokemonId],
    queryFn: () => getPokemonById(pokemonId),
    staleTime: 1000 * 60 * 60,
  });
  if (!pokemon) return <FullScreenLoader color={color} />;
  return (
    <ScrollView
      style={{flex: 1, backgroundColor: pokemon.color}}
      bounces={false}
      showsVerticalScrollIndicator={false}>
      <View style={pokemonScreenStyles.headerContainer}>
        <Text
          style={{
            ...pokemonScreenStyles.pokemonName,
            top: top + 5,
          }}>
          {Formatter.capitalize(pokemon.name) + '\n'}#{pokemon.id}
        </Text>
        <Image source={pokeballImg} style={pokemonScreenStyles.pokeball} />
        <FadeInImage uri={pokemon.avatar} style={pokemonScreenStyles.pokemonImage} />
      </View>
      <View style={{flexDirection: 'row', marginHorizontal: 20, marginTop: 10}}>
        {pokemon.types.map(type => (
          <Chip
            key={type}
            mode="outlined"
            selectedColor="white"
            style={{marginLeft: 10}}>
            {type}
          </Chip>
        ))}
      </View>
      <FlatList
        data={pokemon.sprites}
        horizontal
        keyExtractor={item => item}
        showsHorizontalScrollIndicator={false}
        centerContent
        style={{
          marginTop: 20,
          height: 100,
        }}
        renderItem={({item}) => (
          <FadeInImage
            uri={item}
            style={{width: 100, height: 100, marginHorizontal: 5}}
          />
        )}
      />
            {/* abilities */}
            <Text style={pokemonScreenStyles.subTitle}>Abilities</Text>
      <FlatList
        data={pokemon.abilities}
        horizontal
        keyExtractor={item => item}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <Chip selectedColor="white">{Formatter.capitalize(item)}</Chip>
        )}
      />

      {/* Stats */}
      <Text style={pokemonScreenStyles.subTitle}>Stats</Text>

      <FlatList
        data={pokemon.stats}
        keyExtractor={item => item.name}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <View style={pokemonScreenStyles.statsContainer}>
            <Text style={{flex: 1, color: 'white'}}>
              {Formatter.capitalize(item.name)}
            </Text>
            <Text style={{color: 'white'}}>{item.value}</Text>
          </View>
        )}
      />

      {/* Moves */}
      <Text style={pokemonScreenStyles.subTitle}>Moves</Text>
      <FlatList
        data={pokemon.moves}
        horizontal
        showsHorizontalScrollIndicator={false}
        centerContent
        renderItem={({item}) => (
          <View style={pokemonScreenStyles.statsContainer}>
            <Text style={{flex: 1, color: 'white'}}>
              {Formatter.capitalize(item.name)}
            </Text>
            <Text style={{color: 'white'}}>lvl {item.level}</Text>
          </View>
        )}
      />

      {/* Games */}
      <Text style={pokemonScreenStyles.subTitle}>Games</Text>
      <FlatList
        data={pokemon.games}
        horizontal
        keyExtractor={item => item}
        showsHorizontalScrollIndicator={false}
        centerContent
        renderItem={({item}) => (
          <Chip selectedColor="white">{Formatter.capitalize(item)}</Chip>
        )}
      />
      <View style={{height: 100}} />
    </ScrollView>
  );
};
