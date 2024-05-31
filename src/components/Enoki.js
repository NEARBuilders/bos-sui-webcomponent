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
;
  // function that does whatever

  const client = useSuiClient();
  const enokiFlow = useEnokiFlow();

  async function handleButtonClick() {
    // Get the keypair for the current user.
    const keypair = await enokiFlow.getKeypair({ network }); // issue

    const txb = new TransactionBlock();

    // Add some transactions to the block...
    console.log("doing something with: ", txb);

    // Sign and execute the transaction block, using the Enoki keypair
    await client.signAndExecuteTransactionBlock({
      signer: keypair,
      transactionBlock: txb,
    });
  }

  return <>
  <div>Connected to {account.address}</div>
  {provides && provides({ handleButtonClick })}
  </>;
}

export default Enoki;
