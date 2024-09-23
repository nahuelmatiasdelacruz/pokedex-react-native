import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated, View } from 'react-native';
import { useAnimation } from '../../hooks/useAnimation';
import { FadeInImageProps } from '../../../infrastructure/interfaces/components/ui/FadeInImage.interface';



export const FadeInImage = ({uri, style}: FadeInImageProps) => {
  const {animatedOpacity, fadeIn} = useAnimation();
  const [isLoading, setIsLoading] = useState(true);

  const isDisposed = useRef<boolean>(false);

  const onLoadEnd = () => {
    if(isDisposed.current) return;
    fadeIn({});
    setIsLoading(false);
  }

  useEffect(()=>{
    return () => {
      isDisposed.current = true;
    }
  },[]);
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      {isLoading && (
        <ActivityIndicator
          style={{position: 'absolute'}}
          color="grey"
          size={30}
        />
      )}

      <Animated.Image
        source={{uri}}
        onLoadEnd={onLoadEnd}
        style={[style, {opacity: animatedOpacity, resizeMode: 'contain'}]}
      />
    </View>
  );
};
