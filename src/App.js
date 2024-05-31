import "App.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { Widget } from "near-social-vm";
import React, { useEffect, useMemo, useState } from "react";
import "react-bootstrap-typeahead/css/Typeahead.css";
import Editor from "./components/Editor/Editor";

import { sanitizeUrl } from "@braintree/sanitize-url";
import { useAccount, useInitNear } from "near-social-vm";
import {
  createBrowserRouter,
  Link,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import Enoki from "./components/Enoki";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { EnokiFlowProvider } from "@mysten/enoki/react";
import {
  ConnectButton,
  createNetworkConfig,
  SuiClientProvider,
  WalletProvider,
} from "@mysten/dapp-kit";
import { getFullnodeUrl } from "@mysten/sui/client";

import "@mysten/dapp-kit/dist/index.css";
import EditorPage from "./components/Editor/Editor";
import useRedirectMap from "./hooks/useRedirectMap";
import SuiClientQuery from "./components/SuiClientQuery";
import SuiSigner from "./components/SuiSigner";

function Viewer({ widgetSrc, code, initialProps }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const { components: redirectMap } = useRedirectMap();

  // create props from params
  const passProps = useMemo(() => {
    return Array.from(searchParams.entries()).reduce((props, [key, value]) => {
      props[key] = value;
      return props;
    }, {});
  }, [location]);

  const path = location.pathname.substring(1);

  const src = useMemo(() => {
    const pathSrc = widgetSrc ?? path;
    return pathSrc;
  }, [widgetSrc, path]);

  return (
    <>
      <Widget
        src={!code && src}
        code={code} // prioritize code
        props={{ ...initialProps, ...passProps }}
        config={{ redirectMap }}
      />
    </>
  );
}

function App(props) {
  const { src, code, initialProps, rpc, network, selectorPromise } = props;
  const { initNear } = useInitNear();

  const queryClient = new QueryClient();

  const { networkConfig } = createNetworkConfig({
    localnet: { url: getFullnodeUrl("localnet") },
    devnet: { url: getFullnodeUrl("devnet") },
    testnet: { url: getFullnodeUrl("testnet") },
    mainnet: { url: getFullnodeUrl("mainnet") },
  });

  useAccount();
  useEffect(() => {
    const config = {
      networkId: network || "mainnet",
      selector: selectorPromise,
      customElements: {
        Link: (props) => {
          if (!props.to && props.href) {
            props.to = props.href;
            delete props.href;
          }
          if (props.to) {
            props.to = sanitizeUrl(props.to);
          }
          return <Link {...props} />;
        },
        EnokiFlow: (props) => {
          return (
            <EnokiFlowProvider apiKey="YOUR_PUBLIC_ENOKI_API_KEY">
              <Enoki network={networkConfig["testnet"]} {...props} />
            </EnokiFlowProvider>
          );
        },
        ConnectButton: (props) => {
          return <ConnectButton {...props} />;
        },
        SuiClientQuery: (props) => {
          return <SuiClientQuery {...props} />;
        },
        SuiSigner: (props) => {
          return <SuiSigner {...props} />;
        },
        Editor: (props) => {
          return <EditorPage {...props} />;
        },
      },
      features: {
        enableComponentSrcDataKey: true,
      },
      config: {
        defaultFinality: undefined,
      },
    };

    if (rpc) {
      config.config.nodeUrl = rpc;
    }

    initNear && initNear(config);
  }, [initNear, rpc]);

  const router = createBrowserRouter([
    {
      path: "/*",
      element: (
        <Viewer widgetSrc={src} code={code} initialProps={initialProps} />
      ),
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networkConfig} defaultNetwork={"devnet"}>
        <WalletProvider autoConnect>
          <RouterProvider router={router} />
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
}

export default App;
