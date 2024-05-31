import {
  useCurrentAccount,
  useSuiClientQuery
} from "@mysten/dapp-kit";
import _ from "lodash";
import React from "react";

function SuiClientQuery(props) {
  const { provides, query } = props;

  const { data, isPending, isError, error, refetch } = useSuiClientQuery(
    query.method,
    query.params,
    query.options
  );

  console.log("error", error);

  return (
    <>
      {provides &&
        provides({
          data: _.cloneDeep(data),
          isPending,
          isError,
          error: _.cloneDeep(error),
          refetch,
        })}
    </>
  );
}

export default SuiClientQuery;
