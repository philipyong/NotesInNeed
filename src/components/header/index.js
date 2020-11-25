import React from "react";
import {
  Container,
  Drawer,
  Group,
  Search,
  Settings,
  Title,
} from "./styles/header";

export default function Header({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
}

Header.Group = function HeaderGroup({ children, ...restProps }) {
  return <Group {...restProps}>{children}</Group>;
};

Header.Drawer = function HeaderDrawer({ children, ...restProps }) {
  return <Drawer {...restProps}>{children}</Drawer>;
};

Header.Title = function HeaderTitle({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>;
};

Header.Search = function HeaderSearch({ children, ...restProps }) {
  return <Search {...restProps}>{children}</Search>;
};

Header.Settings = function HeaderSettings({ children, ...restProps }) {
  return <Settings {...restProps}>{children}</Settings>;
};
