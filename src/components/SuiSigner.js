import { useSignPersonalMessage } from "@mysten/dapp-kit";
import React from "react";

function SuiSigner(props) {
  const { provides } = props;

  const { mutate: signPersonalMessage } = useSignPersonalMessage();

  return <>{provides && provides({ signPersonalMessage })}</>;
}

export default SuiSigner;
