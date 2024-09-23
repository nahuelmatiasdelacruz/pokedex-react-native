import { createContext, PropsWithChildren } from "react";
import { NavigationContainer, DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import { adaptNavigationTheme, PaperProvider } from 'react-native-paper';
import { NavigationTheme } from "react-native-paper/lib/typescript/types";
import { useColorScheme } from "react-native";

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

interface ThemeContextInterface {
  isDark: boolean;
  theme: NavigationTheme
}

export const ThemeContext = createContext<ThemeContextInterface>({
  isDark: false,
  theme: LightTheme
});

export const ThemeContextProvider = ({children}:PropsWithChildren) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const theme = isDark ? NavigationDarkTheme : NavigationDefaultTheme;
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <ThemeContext.Provider value={{isDark,theme}}>
          {children}
        </ThemeContext.Provider>
      </NavigationContainer>
    </PaperProvider>
  );
};
