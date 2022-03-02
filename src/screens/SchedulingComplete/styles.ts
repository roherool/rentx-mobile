import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  background: ${({ theme }) => theme.colors.header};

  flex: 1;

  padding-top: 40px;
`;

export const Content = styled.View`
  align-items: center;
  flex: 1;
  justify-content: center;

  padding-bottom: 80px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  font-size: ${RFValue(30)}px;

  margin-top: 40px;
`;

export const Message = styled.Text`
  color: ${({ theme }) => theme.colors.text_detail};
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;
  line-height: ${RFValue(25)}px;
  text-align: center;

  margin-top: 16px;
`;

export const Footer = styled.View`
  align-items: center;

  margin: 40px 0;

  width: 100%;
`;
