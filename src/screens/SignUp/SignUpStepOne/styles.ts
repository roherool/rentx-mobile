import styled from "styled-components/native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  background: ${({ theme }) => theme.colors.bg_primary};

  padding: 0 24px;
`;

export const Header = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;

  margin-top: ${getStatusBarHeight() + 31}px;

  width: 100%;
`;

export const Steps = styled.View`
  align-items: center;
  flex-direction: row;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  font-size: ${RFValue(40)}px;

  margin-bottom: 16px;
  margin-top: 60px;
`;

export const SubTitle = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;
  line-height: ${RFValue(25)}px;
`;

export const Form = styled.View`
  margin-bottom: 16px;
  margin-top: 64px;

  width: 100%;
`;

export const FormTitle = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  font-size: ${RFValue(20)}px;

  margin-bottom: 24px;
`;
