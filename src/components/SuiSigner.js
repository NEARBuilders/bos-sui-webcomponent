import React from "react";

function SuiSigner(props) {
  const { provides } = props;

  return <>{provides && provides({})}</>;
}

export default SuiSigner;
