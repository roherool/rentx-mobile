import styled from "styled-components/native";

export const Container = styled.View`
  background: ${({ theme }) => theme.colors.header};

  align-items: center;
  flex: 1;
  justify-content: center;
`;
