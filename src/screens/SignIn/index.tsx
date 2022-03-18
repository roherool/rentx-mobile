import React, { useState } from "react";
import {
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Yup from "yup";

import { RootStackParamList } from "../../routes/auth.routes";

import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { PasswordInput } from "../../components/PasswordInput";

import { useTheme } from "styled-components";
import { useAuth } from "../../hooks/auth";

import * as s from "./styles";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const theme = useTheme();
  const navigation = useNavigation<RootStackParamList>();
  const { signIn } = useAuth();

  async function handleSignIn() {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required("E-mail obrigatório")
          .email("Digite um e-mail válido"),
        password: Yup.string().required("A senha é obrigatória"),
      });

      await schema.validate({ email, password });

      signIn({ email, password });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert("Opa", error.message);
      } else {
        Alert.alert(
          "Erro de autenticação",
          "Ocorreu um erro ao fazer login, verifique as credenciais"
        );
      }
    }
  }

  function handleNewAccount() {
    navigation.navigate("SignUpStepOne");
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <s.Container>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent
          />
          <s.Header>
            <s.Title>Estamos{"\n"}quase lá.</s.Title>
            <s.SubTitle>
              Faça seu login para começar{"\n"}uma experiência incrível.
            </s.SubTitle>
          </s.Header>

          <s.Form>
            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={setEmail}
              value={email}
            />

            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />
          </s.Form>

          <s.Footer>
            <Button
              title="Login"
              onPress={handleSignIn}
              enabled={true}
              loading={false}
            />

            <Button
              title="Criar conta gratuíta"
              color={theme.colors.bg_secondary}
              light
              onPress={handleNewAccount}
              enabled={true}
              loading={false}
            />
          </s.Footer>
        </s.Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
