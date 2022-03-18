import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Splash } from "../screens/Splash";
import { SignIn } from "../screens/SignIn";
import { SignUpStepOne } from "../screens/SignUp/SignUpStepOne";
import { SignUpStepTwo } from "../screens/SignUp/SignUpStepTwo";
import { Confirmation } from "../screens/Confirmation";

const { Navigator, Screen } = createStackNavigator<RootStackParamList>();

export type RootStackParamList = {
  Splash: undefined;
  SignIn: undefined;
  SignUpStepOne: undefined;
  SignUpStepTwo: undefined;
  Confirmation: undefined;
  navigate: (screen: string) => void;
};

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
      <Screen name="Splash" component={Splash} />
      <Screen name="SignIn" component={SignIn} />
      <Screen name="SignUpStepOne" component={SignUpStepOne} />
      <Screen name="SignUpStepTwo" component={SignUpStepTwo} />
      <Screen name="Confirmation" component={Confirmation} />
    </Navigator>
  );
}
