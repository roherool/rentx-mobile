import styled, { css } from "styled-components/native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  background: ${({ theme }) => theme.colors.bg_primary};

  align-items: center;
  flex: 1;
`;

export const Header = styled.View`
  background: ${({ theme }) => theme.colors.header};

  justify-content: center;

  padding: 25px;
  padding-top: ${getStatusBarHeight() + 30}px;

  height: 325px;
  width: 100%;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  font-size: ${RFValue(30)}px;

  margin-top: 24px;
`;

export const SubTitle = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.secondary_400};
  font-size: ${RFValue(15)}px;

  margin-top: 24px;
`;

export const Content = styled.View`
  flex: 1;

  padding: 0 16px;

  width: 100%;
`;

export const Appointments = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;

  padding: 24px 0;

  width: 100%;
`;

export const AppointmentsTitle = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;
`;

export const AppointmentsQuantity = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.primary_500};
  font-size: ${RFValue(15)}px;
`;

export const CarWrapper = styled.View`
  margin-bottom: 16px;
`;

export const CarFooter = styled.View`
  background: ${({ theme }) => theme.colors.bg_secondary};

  align-items: center;
  flex-direction: row;
  justify-content: space-between;

  margin-top: -10px;
  padding: 12px;

  width: 100%;
`;

export const CarFooterTitle = styled.Text`
  color: ${({ theme }) => theme.colors.text_detail};
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  font-size: ${RFValue(10)}px;
`;

export const CarFooterPeriod = styled.View`
  flex-direction: row;
`;

export const CarFooterDate = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(13)}px;
`;
