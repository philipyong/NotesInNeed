import React from "react";
import {
  Container,
  Title,
  Date,
  Body,
  TagContainer,
  Tag,
  TagBox,
  Delete,
} from "./styles/note";

export default function Note({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
}

Note.Delete = function NoteDelete({ children, ...restProps }) {
  return <Delete {...restProps}>{children}</Delete>;
};

Note.Title = function NoteTitle({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>;
};

Note.Date = function NoteDate({ children, ...restProps }) {
  return <Date {...restProps}>{children}</Date>;
};

Note.Body = function NoteBody({ children, ...restProps }) {
  return <Body {...restProps}>{children}</Body>;
};

Note.TagContainer = function NoteTagContainer({ children, ...restProps }) {
  return <TagContainer {...restProps}>{children}</TagContainer>;
};

Note.TagBox = function NoteTagBox({ children, ...restProps }) {
  return <TagBox {...restProps}>{children}</TagBox>;
};

Note.Tag = function NoteTag({ children, ...restProps }) {
  return <Tag {...restProps}>{children}</Tag>;
};
