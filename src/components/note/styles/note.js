import { Dimensions } from "react-native";
import styled from "styled-components/native";

const width = Dimensions.get("window").width / 2 - 20;

export const Container = styled.TouchableOpacity`
  width: ${width}px;
  margin: 10px;
  background-color: ${(props) => props.backgroundC};
  padding: 10px;
  border-radius: 25px;
`;

export const Delete = styled.TouchableOpacity`
  position: absolute;
  align-self: flex-end;
  background-color: #ff0130;
  border-radius: 20px;
  border: 1px solid black;
  right: 0;
`;

export const Title = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: black;
`;

export const Date = styled.Text`
  font-size: 12px;
  color: black;
  margin-bottom: 2px;
`;

export const Body = styled.Text`
  font-size: 14px;
  color: black;
`;

export const TagContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  width: ${width - 20}px;
`;

export const TagBox = styled.View`
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  margin-right: 5px;
  margin-bottom: 3px;
  align-items: center;
  justify-content: center;
`;

export const Tag = styled.Text`
  color: black;
  margin: 2px 5px;
`;
