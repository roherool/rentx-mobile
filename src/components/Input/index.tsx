import React, { useState } from "react";
import { TextInputProps } from "react-native";
import { Feather } from "@expo/vector-icons";

import { useTheme } from "styled-components";

import * as s from "./styles";

interface InputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>["name"];
  value?: string;
}

export function Input({ iconName, value, ...rest }: InputProps) {
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
        isFocused={isFocused}
        {...rest}
      />
    </s.Container>
  );
}
