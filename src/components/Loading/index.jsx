import React from "react";
import { Body } from "./styles";
import { Spinner } from "@ui-kitten/components";

const LoadingComponent = () => {
  return (
    <Body>
      <Spinner size="giant" />
    </Body>
  );
};

export default LoadingComponent;
