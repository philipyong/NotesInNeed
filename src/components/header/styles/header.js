import styled from "styled-components/native";

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Group = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px 0;
`;

export const Drawer = styled.TouchableOpacity`
  margin: 0 10px;
`;

export const Title = styled.Text`
  color: black;
  font-size: 24px;
  margin: 0 10px;
`;

export const Search = styled.TouchableOpacity`
  margin: 0 10px;
`;

export const Settings = styled.TouchableOpacity`
  margin: 0 10px;
`;
