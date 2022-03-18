import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { RootStackParamList } from "../../routes/auth.routes";

import BrandSvg from "../../assets/brand.svg";
import LogoSvg from "../../assets/logo.svg";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate,
  runOnJS,
} from "react-native-reanimated";

import { Container } from "./styles";

export function Splash() {
  const splashAnimation = useSharedValue(0);

  const navigation = useNavigation<RootStackParamList>();

  const brandStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 50], [1, 0]),
      transform: [
        {
          translateX: interpolate(
            splashAnimation.value,
            [0, 50],
            [0, -50],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });

  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 25, 50], [0, 0.3, 1]),
      transform: [
        {
          translateX: interpolate(
            splashAnimation.value,
            [0, 50],
            [-50, 0],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });

  function startApp() {
    navigation.navigate("SignIn");
  }

  useEffect(() => {
    splashAnimation.value = withTiming(50, { duration: 2000 }, () => {
      "worklet";
      runOnJS(startApp)();
    });
  }, []);

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Animated.View style={[brandStyle, { position: "absolute" }]}>
        <BrandSvg height={80} width={80} />
      </Animated.View>

      <Animated.View style={[logoStyle, { position: "absolute" }]}>
        <LogoSvg height={180} width={180} />
      </Animated.View>
    </Container>
  );
}
