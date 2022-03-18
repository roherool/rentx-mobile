import React, { useEffect, useState } from "react";
import { StatusBar, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { useNetInfo } from "@react-native-community/netinfo";

import { CarDTO } from "../../dtos/Car.dto";
import { Car as CarModel } from "../../database/model/Car";
import { getAcessoryIcon } from "../../utils/getAcessoryIcon";

import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";
import { Accessory } from "../../components/Accessory";
import { Button } from "../../components/Button";

import { api } from "../../services/api";
import { useTheme } from "styled-components";

import * as s from "./styles";

interface Params {
  car: CarModel;
}

export function CarDetails() {
  const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO);

  const netInfo = useNetInfo();
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { car } = route.params as Params;

  const theme = useTheme();

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 200],
        [200, 70],
        Extrapolate.CLAMP
      ),
    };
  });

  const sliderCarsStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0, 150], [1, 0], Extrapolate.CLAMP),
    };
  });

  function handleNavigateScheduling() {
    navigation.navigate("Scheduling", { car });
  }

  function handleBack() {
    navigation.goBack();
  }

  useEffect(() => {
    async function fetchCarUpdated() {
      const response = await api.get(`/cars/${car.id}`);
      setCarUpdated(response.data);
    }

    if (netInfo.isConnected === true) {
      fetchCarUpdated();
    }
  }, [netInfo.isConnected]);

  return (
    <s.Container>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <Animated.View
        style={[
          headerStyleAnimation,
          styles.header,
          { backgroundColor: theme.colors.bg_secondary },
        ]}
      >
        <s.Header>
          <BackButton onPress={handleBack} />
        </s.Header>

        <Animated.View style={sliderCarsStyleAnimation}>
          <s.CarImages>
            <ImageSlider
              imagesUrl={
                !!carUpdated.photos
                  ? carUpdated.photos
                  : [{ id: car.thumbnail, photo: car.thumbnail }]
              }
            />
          </s.CarImages>
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: getStatusBarHeight() + 160,
        }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <s.Details>
          <s.Description>
            <s.Brand>{car.brand}</s.Brand>
            <s.Name>{car.name}</s.Name>
          </s.Description>

          <s.Rent>
            <s.Period>{car.period}</s.Period>
            <s.Price>
              R$ {netInfo.isConnected === true ? car.price : "..."}
            </s.Price>
          </s.Rent>
        </s.Details>

        {carUpdated.accessories && (
          <s.Accessories>
            {carUpdated.accessories.map((accessory) => (
              <Accessory
                key={accessory.type}
                name={accessory.name}
                icon={getAcessoryIcon(accessory.type)}
              />
            ))}
          </s.Accessories>
        )}

        <s.About>{car.about}</s.About>
      </Animated.ScrollView>

      <s.Footer>
        <Button
          title="Escolher perído do aluguel"
          onPress={handleNavigateScheduling}
          enabled={netInfo.isConnected === true}
        />

        {netInfo.isConnected === false && (
          <s.OfflineInfo>
            Você precisa estar conectado a internet para mais detalhes e
            agendamentos
          </s.OfflineInfo>
        )}
      </s.Footer>
    </s.Container>
  );
}

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    overflow: "hidden",
    zIndex: 1,
  },
});
