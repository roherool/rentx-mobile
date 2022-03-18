import React, { useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Yup from "yup";

import { BackButton } from "../../../components/BackButton";
import { Button } from "../../../components/Button";
import { Bullet } from "../../../components/Bullet";
import { Input } from "../../../components/Input";

import * as s from "./styles";

export function SignUpStepOne() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [driverLicense, setDriverLicense] = useState("");

  const navigation = useNavigation<any>();

  function handleBack() {
    navigation.goBack();
  }

  async function handleNextStep() {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string().required("CNH é obrigatório"),
        email: Yup.string().required("E-mail é obrigatório"),
        name: Yup.string().required("Nome é obrigatório"),
      });

      const data = { name, email, driverLicense };
      await schema.validate(data);

      navigation.navigate("SignUpStepTwo", { user: data });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert("Opa", error.message);
      }
    }
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
            <s.FormTitle>1. Dados</s.FormTitle>
            <Input
              iconName="user"
              placeholder="Nome"
              onChangeText={setName}
              value={name}
            />
            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              onChangeText={setEmail}
              value={email}
            />
            <Input
              iconName="credit-card"
              placeholder="CNH"
              keyboardType="numeric"
              onChangeText={setDriverLicense}
              value={driverLicense}
            />
          </s.Form>

          <Button title="Próximo" onPress={handleNextStep} />
        </s.Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
