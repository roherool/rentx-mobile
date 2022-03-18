import React, { useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";
import { useNavigation } from "@react-navigation/core";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import * as ImagePicker from "expo-image-picker";
import { Feather } from "@expo/vector-icons";
import * as Yup from "yup";

import { useAuth } from "../../hooks/auth";

import { BackButton } from "../../components/BackButton";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { PasswordInput } from "../../components/PasswordInput";

import { useTheme } from "styled-components";

import * as s from "./styles";

export function Profile() {
  const { user, signOut, updatedUser } = useAuth();
  const netInfo = useNetInfo();

  const [option, setOption] = useState<"dataEdit" | "passwordEdit">("dataEdit");
  const [avatar, setAvatar] = useState(user.avatar);
  const [name, setName] = useState(user.name);
  const [driverLicense, setDriverLicense] = useState(user.driver_license);

  const theme = useTheme();
  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }

  function handleSignOut() {
    Alert.alert(
      "Tem certeza?",
      "Você precisará de internet para logar novamente.",
      [
        {
          text: "Cancelar",
          onPress: () => {},
        },
        {
          text: "Sair",
          onPress: () => signOut(),
        },
      ]
    );
  }

  function handleOptionChange(optionSelected: "dataEdit" | "passwordEdit") {
    if (netInfo.isConnected === false && optionSelected === "passwordEdit") {
      Alert.alert(
        "Você está Offline!",
        "Para alterar a senha, conecte-se a internet"
      );
    } else {
      setOption(optionSelected);
    }
  }

  async function handleAvatarSelect() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (result.cancelled) {
      return;
    }

    if (result.uri) {
      setAvatar(result.uri);
    }
  }

  async function handleProfileUpdate() {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string().required("CNH é obrigatório"),
        name: Yup.string().required("Nome é obrigatório"),
      });

      const data = { name, driverLicense };
      await schema.validate(data);

      await updatedUser({
        id: user.id,
        user_id: user.user_id,
        email: user.email,
        name: user.name,
        driver_license: driverLicense,
        avatar,
        token: user.token,
      });

      Alert.alert("Perfil atualizado!");
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert("Opa", error.message);
      } else {
        Alert.alert("Não foi possível atualizar o perfil");
      }
    }
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <s.Container>
          <s.Header>
            <s.HeaderTop>
              <BackButton color={theme.colors.shape} onPress={handleBack} />
              <s.HeaderTitle>Editar Perfil</s.HeaderTitle>
              <s.LogoutButton onPress={handleSignOut}>
                <Feather name="power" size={24} color={theme.colors.shape} />
              </s.LogoutButton>
            </s.HeaderTop>

            <s.PhotoContainer>
              {!!avatar && <s.Photo source={{ uri: avatar }} />}
              <s.PhotoButton onPress={handleAvatarSelect}>
                <Feather name="camera" size={24} color={theme.colors.shape} />
              </s.PhotoButton>
            </s.PhotoContainer>
          </s.Header>

          <s.Content style={{ marginBottom: useBottomTabBarHeight() }}>
            <s.Options>
              <s.Option active={option === "dataEdit"}>
                <s.OptionTitle
                  active={option === "dataEdit"}
                  onPress={() => handleOptionChange("dataEdit")}
                >
                  Dados
                </s.OptionTitle>
              </s.Option>
              <s.Option
                active={option === "passwordEdit"}
                onPress={() => handleOptionChange("passwordEdit")}
              >
                <s.OptionTitle active={option === "passwordEdit"}>
                  Trocar senha
                </s.OptionTitle>
              </s.Option>
            </s.Options>

            {option === "dataEdit" ? (
              <s.Section>
                <Input
                  iconName="user"
                  placeholder="Nome"
                  autoCorrect={false}
                  defaultValue={user.name}
                  onChangeText={setName}
                  value={name}
                />
                <Input
                  iconName="mail"
                  editable={false}
                  defaultValue={user.email}
                />
                <Input
                  iconName="credit-card"
                  placeholder="CNH"
                  keyboardType="numeric"
                  defaultValue={user.driver_license}
                  onChangeText={setName}
                  value={name}
                />
              </s.Section>
            ) : (
              <s.Section>
                <PasswordInput iconName="lock" placeholder="Senha atual" />
                <PasswordInput iconName="lock" placeholder="Nova senha" />
                <PasswordInput iconName="lock" placeholder="Repetir senha" />
              </s.Section>
            )}

            <Button title="Salvar alterações" onPress={handleProfileUpdate} />
          </s.Content>
        </s.Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
