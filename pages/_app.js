import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";
import { RobinHoodProvider } from "../context/RobinhoodContext";

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider
      serverUrl="https://ixvfobknjdcn.usemoralis.com:2053/server"
      appId="KNBU5taLOkf8X0r3KttkmH2hj6fUiPPGQ1VIUTpD"
    >
      <RobinHoodProvider>
        <Component {...pageProps} />
      </RobinHoodProvider>
    </MoralisProvider>
  );
}

export default MyApp;
