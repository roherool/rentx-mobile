import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";

interface ButtonProps extends RectButtonProps {
  color: string;
}

export const Container = styled(RectButton)<ButtonProps>`
  background: ${({ color }) => color};

  align-items: center;
  justify-content: center;

  padding: 19px;

  width: 100%;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.primary_500};
  font-size: ${RFValue(15)}px;
`;
