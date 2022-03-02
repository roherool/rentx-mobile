import styled from "styled-components/native";
import { FlatList, FlatListProps } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";

import { CarDTO } from "../../dtos/Car.dto";

export const Container = styled.View`
  background: ${({ theme }) => theme.colors.bg_primary};

  flex: 1;
`;

export const Header = styled.View`
  background: ${({ theme }) => theme.colors.header};

  justify-content: flex-end;

  padding: 32px 24px;

  height: 113px;
  width: 100%;
`;

export const HeaderContent = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

export const TotalCars = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;
`;

export const CarList = styled(
  FlatList as new (props: FlatListProps<CarDTO>) => FlatList<CarDTO>
).attrs({
  contentContainerStyle: { padding: 24 },
  showsVerticalScrollIndicator: false,
})``;

export const MyCarsButton = styled(RectButton)`
  background: ${({ theme }) => theme.colors.main};
  border-radius: 30px;

  align-items: center;
  bottom: 13px;
  justify-content: center;
  position: absolute;
  right: 22px;

  height: 60px;
  width: 60px;
`;
