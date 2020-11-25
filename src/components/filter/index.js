import React from "react";
import { Container, Label, Option } from "./styles/filter";

export default function Filter({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
}

Filter.Option = function FilterOption({ children, ...restProps }) {
  return <Option {...restProps}>{children}</Option>;
};

Filter.Label = function FilterLabel({ children, ...restProps }) {
  return <Label {...restProps}>{children}</Label>;
};
