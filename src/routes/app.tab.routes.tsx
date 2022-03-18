import React from "react";
import { Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeSvg from "../assets/home.svg";
import CarSvg from "../assets/car.svg";
import PeopleSvg from "../assets/people.svg";

import { CarDTO } from "../dtos/Car.dto";
import { useTheme } from "styled-components";

import { AppStackRoutes } from "./app.stack.routes";

import { Home } from "../screens/Home";
import { MyCars } from "../screens/MyCars";
import { Profile } from "../screens/Profile";

const { Navigator, Screen } = createBottomTabNavigator<RootStackParamList>();

export type RootStackParamList = {
  Home: undefined;
  MyCars: { car: CarDTO | undefined };
  Profile: undefined;
  navigate: (screen: string, carObject?: { car: CarDTO }) => void;
};

export function AppTabRoutes() {
  const theme = useTheme();

  return (
    <Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.main,
        tabBarInactiveTintColor: theme.colors.text_detail,
        tabBarShowLabel: false,
        tabBarStyle: {
          paddingVertical: Platform.OS === "ios" ? 20 : 0,
          height: 78,
          backgroundColor: theme.colors.bg_primary,
        },
      }}
    >
      <Screen
        name="Home"
        component={AppStackRoutes}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSvg height={24} width={24} fill={color} />
          ),
        }}
      />
      <Screen
        name="MyCars"
        component={MyCars}
        options={{
          tabBarIcon: ({ color }) => (
            <CarSvg height={24} width={24} fill={color} />
          ),
        }}
      />
      <Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <PeopleSvg height={24} width={24} fill={color} />
          ),
        }}
      />
    </Navigator>
  );
}
