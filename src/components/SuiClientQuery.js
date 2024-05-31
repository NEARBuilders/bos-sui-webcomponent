import {
  useDisconnectWallet,
  useSuiClientQuery
} from "@mysten/dapp-kit";
import React from "react";

function SuiClientQuery(props) {
  const { provides, query } = props;

  const { data, isPending, isError, error, refetch } = useSuiClientQuery(
    query.method,
    query.params,
    query.options
  );

  const { mutate: disconnect } = useDisconnectWallet();

  return (
    <>
      {provides &&
        provides({
          data,
          isPending,
          isError,
          error,
          refetch,
          disconnect: disconnect,
        })}
    </>
  );
}

export default SuiClientQuery;
