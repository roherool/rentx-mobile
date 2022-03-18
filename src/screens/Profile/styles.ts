import styled, { css } from "styled-components/native";
import { BorderlessButton, RectButton } from "react-native-gesture-handler";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";

interface OptionProps {
  active: boolean;
}

export const Container = styled.View`
  background: ${({ theme }) => theme.colors.bg_primary};
`;

export const Header = styled.View`
  background: ${({ theme }) => theme.colors.header};

  align-items: center;

  padding: 0 24px;

  height: 227px;
  width: 100%;
`;

export const HeaderTop = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;

  margin-top: ${getStatusBarHeight() + 32}px;

  width: 100%;
`;

export const HeaderTitle = styled.Text`
  color: ${({ theme }) => theme.colors.bg_secondary};
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  font-size: ${RFValue(25)}px;
`;

export const LogoutButton = styled(BorderlessButton)``;

export const PhotoContainer = styled.View`
  background: ${({ theme }) => theme.colors.shape};
  border-radius: 90px;

  margin-top: 48px;

  height: 180px;
  width: 180px;
`;

export const Photo = styled.Image`
  border-radius: 90px;

  height: 180px;
  width: 180px;
`;

export const PhotoButton = styled(RectButton)`
  background: ${({ theme }) => theme.colors.main};

  align-items: center;
  justify-content: center;

  position: absolute;
  bottom: 10px;
  right: 10px;

  height: 40px;
  width: 40px;
`;

export const Content = styled.View`
  margin-top: 122px;
  padding: 0 24px;
`;

export const Options = styled.View`
  border-bottom-color: ${({ theme }) => theme.colors.line};
  border-bottom-width: 1px;

  flex-direction: row;
  justify-content: space-around;

  margin-bottom: 24px;
`;

export const Option = styled.TouchableOpacity<OptionProps>`
  padding-bottom: 14px;

  ${({ active }) =>
    active &&
    css`
      border-bottom-color: ${({ theme }) => theme.colors.main};
      border-bottom-width: 3px;
    `}
`;

export const OptionTitle = styled.Text<OptionProps>`
  color: ${({ theme, active }) =>
    active ? theme.colors.header : theme.colors.text_detail};
  font-family: ${({ theme, active }) =>
    active ? theme.fonts.secondary_600 : theme.fonts.secondary_500};
  font-size: ${RFValue(20)}px;
`;

export const Section = styled.View``;
