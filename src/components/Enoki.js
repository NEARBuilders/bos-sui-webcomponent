import React from "react";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import { useCurrentAccount, useSuiClient } from "@mysten/dapp-kit";
import { useEnokiFlow } from "@mysten/enoki/react";

function Enoki(props) {
  const { provides, network } = props;
  const account = useCurrentAccount();

  if (!account) {
    return null;
  }
  const client = useSuiClient();
  const enokiFlow = useEnokiFlow();

  async function handleEnokiFlow() {
    // Get the keypair for the current user.
    const keypair = await enokiFlow.getKeypair({ network });

    const txb = new TransactionBlock();

    // Add some transactions to the block...
    // this can be standardized across your app

    // Sign and execute the transaction block, using the Enoki keypair
    await client.signAndExecuteTransactionBlock({
      signer: keypair,
      transactionBlock: txb,
    });
  }

  return <>{provides && provides({ handleEnokiFlow })}</>;
}

export default Enoki;
