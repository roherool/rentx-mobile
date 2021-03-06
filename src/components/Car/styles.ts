import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import FastImage from "react-native-fast-image";

export const Container = styled(RectButton)`
  background: ${({ theme }) => theme.colors.bg_secondary};

  align-items: center;
  flex-direction: row;
  justify-content: space-between;

  margin-bottom: 16px;
  padding: 24px;

  height: 126px;
  width: 100%;
`;

export const Details = styled.View``;

export const Brand = styled.Text`
  color: ${({ theme }) => theme.colors.text_detail};
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  font-size: ${RFValue(10)}px;
  text-transform: uppercase;
`;

export const Name = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  font-size: ${RFValue(15)}px;
`;

export const About = styled.View`
  align-items: center;
  flex-direction: row;

  margin-top: 16px;
`;

export const Rent = styled.View`
  margin-right: 24px;
`;

export const Period = styled.Text`
  color: ${({ theme }) => theme.colors.text_detail};
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  font-size: ${RFValue(10)}px;
  text-transform: uppercase;
`;

export const Price = styled.Text`
  color: ${({ theme }) => theme.colors.main};
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  font-size: ${RFValue(15)}px;
`;

export const Type = styled.View``;

export const CarImage = styled(FastImage)`
  height: 85px;
  width: 167px;
`;
