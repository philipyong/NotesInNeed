import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  AddTag,
  BodyContainer,
  InputBody,
  InputTitle,
  Tag,
  TagBox,
  TagContainer,
} from "./styles/workspace";

export default function Workspace({ children, ...restProps }) {
  return (
    <KeyboardAwareScrollView {...restProps}>{children}</KeyboardAwareScrollView>
  );
}

Workspace.InputTitle = function WorkspaceInputTitle({
  children,
  ...restProps
}) {
  return <InputTitle {...restProps}>{children}</InputTitle>;
};

Workspace.TagContainer = function WorkspaceTagContainer({
  children,
  ...restProps
}) {
  return <TagContainer {...restProps}>{children}</TagContainer>;
};

Workspace.AddTag = function WorkspaceAddTag({ children, ...restProps }) {
  return <AddTag {...restProps}>{children}</AddTag>;
};

Workspace.TagBox = function WorkspaceTagBox({ children, ...restProps }) {
  return <TagBox {...restProps}>{children}</TagBox>;
};

Workspace.Tag = function WorkspaceTag({ children, ...restProps }) {
  return <Tag {...restProps}>{children}</Tag>;
};

Workspace.BodyContainer = function WorkspaceBodyContainer({
  children,
  ...restProps
}) {
  return <BodyContainer {...restProps}>{children}</BodyContainer>;
};

Workspace.InputBody = function WorkspaceInputBody({ children, ...restProps }) {
  return <InputBody {...restProps}>{children}</InputBody>;
};
