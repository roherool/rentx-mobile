import styled from "styled-components/native";
import { Dimensions } from "react-native";
import FastImage from "react-native-fast-image";

export const Container = styled.View`
  width: 100%;
`;

export const ImageIndexes = styled.View`
  align-self: flex-end;
  flex-direction: row;

  padding-right: 24px;
`;

export const CarImageWrapper = styled.View`
  align-items: center;
  justify-content: center;

  height: 132px;
  width: ${Dimensions.get("window").width}px;
`;

export const CarImage = styled(FastImage)`
  height: 132px;
  width: 288px;
`;
