import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { RectButton } from "react-native-gesture-handler";

export const Container = styled(RectButton)`
  background: ${({ theme }) => theme.colors.shape_dark};

  align-items: center;
  justify-content: center;

  height: 56px;
  width: 80px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.primary_500};
  font-size: ${RFValue(15)}px;
`;
