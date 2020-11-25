import React from "react";
import { SafeAreaView } from "./styles/home";

export default function Home({ children, ...restProps }) {
  return <SafeAreaView {...restProps}>{children}</SafeAreaView>;
}
