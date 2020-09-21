import React, { FunctionComponent } from "react";
import SpinnerLoader from "../../Components/SpinnerLoader/SpinnerLoader";

type WithLoaderProps = {
  loadingStatus: string;
};

const WithLoader: FunctionComponent<WithLoaderProps> = (props: any) => {
  if (props.loadingStatus === "pending") {
    return <SpinnerLoader />;
  }
  return props.children;
};

export default WithLoader;
