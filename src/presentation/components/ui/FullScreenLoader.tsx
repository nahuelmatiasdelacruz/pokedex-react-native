import { View } from "react-native";
import { ActivityIndicator, useTheme } from "react-native-paper";

export const FullScreenLoader = ({color}:{color: string}) => {
  const { colors } = useTheme();
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: (color) ? color : colors.background}}>
      <ActivityIndicator color='white' size={50}/>
    </View>
  );
};