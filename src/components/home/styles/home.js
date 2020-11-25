import { Platform } from "react-native";
import styled from "styled-components/native";

export const SafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: white;
  padding-top: ${Platform.OS === "android" ? 25 : 0}px;
`;
