import { useCurrentAccount, useDisconnectWallet, useSuiClientQuery } from "@mysten/dapp-kit";
import _ from "lodash";
import React from "react";

function SuiClientQuery(props) {
  const { provides, query } = props;

  const { data, isPending, isError, error, refetch } = useSuiClientQuery(
    query.method,
    query.params,
    query.options
  );

  const account = useCurrentAccount();

  const { mutate: disconnect } = useDisconnectWallet();

  console.log("error", error)

  return (
    <>
      <p>Account: {account && account.address}</p>
      <p>Error: {JSON.stringify(error)}</p>
      {provides &&
        provides({
          account: account,
          data: _.cloneDeep(data),
          isPending,
          isError,
          error: _.cloneDeep(error),
          refetch,
          disconnect: disconnect,
        })}
    </>
  );
}

export default SuiClientQuery;
