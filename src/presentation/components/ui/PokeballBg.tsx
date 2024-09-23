import { Image, StyleSheet } from "react-native"
import { PokeballBgInterface } from "../../../infrastructure/interfaces/components/ui/PokeballBg.interface";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export const PokeballBg = ({style}:PokeballBgInterface) => {
  const { isDark } = useContext(ThemeContext);
  const pokeballImg = isDark
    ? require('../../../assets/pokeball-light.png')
    : require('../../../assets/pokeball-dark.png');
  return (
    <Image source={pokeballImg} style={[
      {
        width: 300,
        height: 300,
        opacity: 0.3,
      },
      style
    ]}/>
  );
};