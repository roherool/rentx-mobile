import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { RectButton } from "react-native-gesture-handler";

interface ButtonProps {
  color: string;
}

interface ButtonTextProps {
  light: boolean;
}

export const Container = styled(RectButton)<ButtonProps>`
  background: ${({ color }) => color};

  align-items: center;
  justify-content: center;

  margin-bottom: 8px;
  padding: 19px;

  width: 100%;
`;

export const Title = styled.Text<ButtonTextProps>`
  color: ${({ theme, light }) =>
    light ? theme.colors.header : theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.primary_500};
  font-size: ${RFValue(15)}px;
`;
