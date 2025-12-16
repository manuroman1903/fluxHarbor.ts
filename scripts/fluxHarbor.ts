// app/fluxHarbor.ts
import { OnchainKitProvider } from "@coinbase/onchainkit";
import { Wallet } from "@coinbase/onchainkit/wallet";
import { Connected } from "@coinbase/onchainkit/connected";
import { createPublicClient, http, formatEther, type Address } from "viem";
import { base, baseSepolia } from "viem/chains";
import React, { useMemo, useState } from "react";

type Network = "base" | "baseSepolia";

const RPC = {
  base: "https://mainnet.base.org",
  baseSepolia: "https://sepolia.base.org",
};

const EXPLORER = {
  base: "https://basescan.org",
  baseSepolia: "https://sepolia.basescan.org",
};

const CHAIN_ID = {
  base: 8453,
  baseSepolia: 84532,
};

function isAddress(v: string): v is Address {
  return /^0x[a-fA-F0-9]{40}$/.test(v.trim());
}

export default function FluxHarbor() {
  const [network, setNetwork] = useState<Network>("baseSepolia");
  const [inputAddress, setInputAddress] = useState("");
  const [status, setStatus] = useState("Idle");
  const [rpcChainId, setRpcChainId] = useState<number | null>(null);
  const [block, setBlock] = useState<bigint | null>(null);
  const [balance, setBalance] = useState<bigint | null>(null);

  const chain = network === "base" ? base : baseSepolia;

  const client = useMemo(
    () =>
      createPublicClient({
        chain,
        transport: http(RPC[network]),
      }),
    [chain, network]
  );

  async function execute() {
    setStatus("Querying Base RPC…");

    const [cid, blockNumber] = await Promise.all([
      client.getChainId(),
      client.getBlockNumber(),
    ]);

    setRpcChainId(cid);
    setBlock(blockNumber);

    if (isAddress(inputAddress)) {
      const bal = await client.getBalance({ address: inputAddress });
      setBalance(bal);
    } else {
      setBalance(null);
    }

    setStatus("Complete");
  }

  return (
    <OnchainKitProvider chain={chain}>
      <div style={{ maxWidth: 860, margin: "40px auto", fontFamily: "system-ui" }}>
        <h1>FluxHarbor — Built for Base</h1>

        <div style={{ marginBottom: 14 }}>
          <label>
            Network:&nbsp;
            <select value={network} onChange={(e) => setNetwork(e.target.value as Network)}>
              <option value="baseSepolia">Base Sepolia (84532)</option>
              <option value="base">Base Mainnet (8453)</option>
            </select>
          </label>
        </div>

        <Wallet />
        <Connected>
          <input
            value={inputAddress}
            onChange={(e) => setInputAddress(e.target.value)}
            placeholder="Address for balance lookup"
            style={{ width: "100%", padding: 8, marginTop: 10 }}
          />
        </Connected>

        <button onClick={execute} style={{ marginTop: 14 }}>
          Run Base Reads
        </button>

        <div style={{ marginTop: 18, lineHeight: 1.6 }}>
          <div>Status: {status}</div>
          <div>Expected chainId: {CHAIN_ID[network]}</div>
          <div>RPC chainId: {rpcChainId ?? "—"}</div>
          <div>Latest block: {block?.toString() ?? "—"}</div>
          <div>Balance: {balance ? `${formatEther(balance)} ETH` : "—"}</div>
          <div>Explorer: {EXPLORER[network]}</div>
        </div>
      </div>
    </OnchainKitProvider>
  );
}
