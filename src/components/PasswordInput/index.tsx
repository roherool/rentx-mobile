import React, { useState } from "react";
import { TextInputProps } from "react-native";
import { Feather } from "@expo/vector-icons";
import { BorderlessButton } from "react-native-gesture-handler";

import { useTheme } from "styled-components";

import * as s from "./styles";

interface InputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>["name"];
  value?: string;
}

export function PasswordInput({ iconName, value, ...rest }: InputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const theme = useTheme();

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
  }

  function handlePasswordVisibilityChange() {
    setIsPasswordVisible((prevState) => !prevState);
  }

  return (
    <s.Container>
      <s.IconContainer isFocused={isFocused}>
        <Feather
          name={iconName}
          size={24}
          color={
            isFocused || isFilled ? theme.colors.main : theme.colors.text_detail
          }
        />
      </s.IconContainer>
      <s.InputText
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        secureTextEntry={isPasswordVisible}
        isFocused={isFocused}
        autoCorrect={false}
        {...rest}
      />

      <BorderlessButton onPress={handlePasswordVisibilityChange}>
        <s.IconContainer isFocused={isFocused}>
          <Feather
            name={isPasswordVisible ? "eye" : "eye-off"}
            size={24}
            color={theme.colors.text_detail}
            isFocused={isFocused}
          />
        </s.IconContainer>
      </BorderlessButton>
    </s.Container>
  );
}
