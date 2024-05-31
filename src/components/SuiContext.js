import { useCurrentAccount } from "@mysten/dapp-kit";
import React from "react";

function SuiContext(props) {
  const { provides } = props;

  const account = useCurrentAccount();

  return <>{provides && provides({ account: account && account.address })}</>;
}

export default SuiContext;
