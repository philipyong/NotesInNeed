import styled from "styled-components/native";

export const InputTitle = styled.TextInput`
  height: 70px;
  padding: 10px;
  font-size: 30px;
`;

export const TagContainer = styled.ScrollView`
  margin: 10px;
`;

export const AddTag = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #add8e6;
  border-radius: 15px;
  width: 30px;
`;

export const TagBox = styled.View`
  background-color: #add8e6;
  margin-left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
`;

export const Tag = styled.TextInput`
  color: white;
  padding-left: 8px;
  padding-right: 8px;
  font-size: 20px;
`;

export const BodyContainer = styled.View`
  padding: 10px;
`;

export const InputBody = styled.TextInput`
  font-size: 18px;
`;
