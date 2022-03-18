import React, { useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { BackButton } from "../../../components/BackButton";
import { Button } from "../../../components/Button";
import { Bullet } from "../../../components/Bullet";
import { PasswordInput } from "../../../components/PasswordInput";

import { api } from "../../../services/api";

import { useTheme } from "styled-components";

import * as s from "./styles";

interface Params {
  user: {
    name: string;
    email: string;
    driverLicense: string;
  };
}

export function SignUpStepTwo() {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const navigation = useNavigation<any>();
  const route = useRoute();
  const theme = useTheme();

  const { user } = route.params as Params;

  function handleBack() {
    navigation.goBack();
  }

  async function handleRegister() {
    if (!password || !passwordConfirm) {
      Alert.alert("Informe a senha e repita a mesma");
    }

    if (password !== passwordConfirm) {
      Alert.alert("As senhas não são iguais");
    }

    await api
      .post("/users", {
        name: user.name,
        email: user.email,
        driver_license: user.driverLicense,
        password,
      })
      .then(() => {
        navigation.navigate("Confirmation", {
          nextScreenRoute: "SignIn",
          title: "Conta criada!",
          message: `Agora é só fazer login\ne aproveitar`,
        });
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("Opa", "Não foi possível cadastrar");
      });
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <s.Container>
          <s.Header>
            <BackButton onPress={handleBack} />
            <s.Steps>
              <Bullet active />
              <Bullet />
            </s.Steps>
          </s.Header>

          <s.Title>Crie sua{"\n"}conta</s.Title>
          <s.SubTitle>
            Faça seu cadastro de{"\n"}forma rápida e fácil
          </s.SubTitle>

          <s.Form>
            <s.FormTitle>2. Senha</s.FormTitle>
            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />
            <PasswordInput
              iconName="lock"
              placeholder="Repetir Senha"
              onChangeText={setPasswordConfirm}
              value={passwordConfirm}
            />
          </s.Form>

          <Button
            color={theme.colors.success}
            title="Cadastrar"
            onPress={handleRegister}
          />
        </s.Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
