import styled from "styled-components/native";
import {
  getBottomSpace,
  getStatusBarHeight,
} from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  background: ${({ theme }) => theme.colors.bg_secondary};
  flex: 1;
`;

export const Header = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  position: absolute;

  margin-left: 24px;
  margin-top: ${getStatusBarHeight() + 18}px;
`;

export const CarImages = styled.View`
  margin-top: ${getStatusBarHeight() + 32}px;
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: { alignItems: "center", padding: 24 },
  showsVerticalScrollIndicator: false,
})``;

export const Details = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;

  margin-top: 38px;

  width: 100%;
`;

export const Description = styled.View``;

export const Brand = styled.Text`
  color: ${({ theme }) => theme.colors.text_detail};
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  font-size: ${RFValue(10)}px;

  text-transform: uppercase;
`;

export const Name = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  font-size: ${RFValue(25)}px;
`;

export const Rent = styled.View``;

export const Period = styled.Text`
  color: ${({ theme }) => theme.colors.text_detail};
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  font-size: ${RFValue(10)}px;
  text-transform: uppercase;
`;

export const Price = styled.Text`
  color: ${({ theme }) => theme.colors.main};
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  font-size: ${RFValue(25)}px;
`;

export const About = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;
  line-height: ${RFValue(25)}px;
  text-align: justify;

  margin-top: 23px;
`;

export const Accessories = styled.View`
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;

  margin-top: 16px;

  width: 100%;
`;

export const Footer = styled.View`
  background: ${({ theme }) => theme.colors.bg_secondary};

  padding: 24px 24px ${getBottomSpace() + 24}px;

  width: 100%;
`;
