import styled, { css } from "styled-components/native";
import { TextInput } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

interface Props {
  isFocused: boolean;
}

export const Container = styled.View`
  flex-direction: row;

  margin-bottom: 8px;
`;

export const IconContainer = styled.View<Props>`
  background: ${({ theme }) => theme.colors.bg_secondary};

  align-items: center;
  justify-content: center;

  margin-right: 2px;

  height: 56px;
  width: 55px;

  ${({ theme, isFocused }) =>
    isFocused &&
    css`
      border-bottom-color: ${theme.colors.main};
      border-bottom-width: 2px;
    `}
`;

export const InputText = styled(TextInput)<Props>`
  background: ${({ theme }) => theme.colors.bg_secondary};

  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;

  flex: 1;

  padding: 0 20px;

  ${({ theme, isFocused }) =>
    isFocused &&
    css`
      border-bottom-color: ${theme.colors.main};
      border-bottom-width: 2px;
    `}
`;
