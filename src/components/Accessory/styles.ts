import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  background: ${({ theme }) => theme.colors.bg_primary};

  align-items: center;
  justify-content: center;

  margin-bottom: 8px;
  padding: 16px;

  height: 92px;
  width: 109px;
`;

export const Name = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.primary_500};
  font-size: ${RFValue(13)}px;
`;
