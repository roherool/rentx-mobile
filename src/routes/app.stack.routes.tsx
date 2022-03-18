import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Car as CarModel } from "../database/model/Car";

import { Home } from "../screens/Home";
import { CarDetails } from "../screens/CarDetails";
import { Scheduling } from "../screens/Scheduling";
import { SchedulingDetails } from "../screens/SchedulingDetails";
import { Confirmation } from "../screens/Confirmation";
import { MyCars } from "../screens/MyCars";

const { Navigator, Screen } = createStackNavigator<RootStackParamList>();

export type RootStackParamList = {
  Home: undefined;
  CarDetails: { car: CarModel | undefined };
  Scheduling: { car: CarModel | undefined };
  SchedulingDetails: { car: CarModel; dates: string[] };
  Confirmation: undefined;
  MyCars: { car: CarModel | undefined };
  navigate: (screen: string, carObject?: { car: CarModel }) => void;
};

export function AppStackRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
      <Screen name="Home" component={Home} />
      <Screen name="CarDetails" component={CarDetails} />
      <Screen name="Scheduling" component={Scheduling} />
      <Screen name="SchedulingDetails" component={SchedulingDetails} />
      <Screen name="Confirmation" component={Confirmation} />
      <Screen name="MyCars" component={MyCars} />
    </Navigator>
  );
}
