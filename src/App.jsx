// src/App.jsx
import { useEffect, useState } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

function App() {
  const { publicKey, connected } = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      if (connected && publicKey) {
        const bal = await connection.getBalance(publicKey);
        setBalance(bal / LAMPORTS_PER_SOL);
      }
    };
    fetchBalance();
  }, [connected, publicKey, connection]);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>🪙 Solana Wallet Integration (React + JS)</h1>
      <WalletMultiButton />
      {connected && publicKey && (
        <div style={{ marginTop: "2rem" }}>
          <p>
            <strong>Public Key:</strong> {publicKey.toBase58()}
          </p>
          <p>
            <strong>Balance:</strong> {balance} SOL
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
