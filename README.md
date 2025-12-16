# FluxHarbor

Built for Base

FluxHarbor is a small Base-aligned repository intended to validate network access, wallet connectivity, and read-only onchain queries across Base Mainnet and Base Sepolia.

The project serves as an integration checkpoint rather than a full application, focusing on clarity, Base compatibility, and explorer transparency.

---

## Supported Base Networks

Base Mainnet  
- chainId (decimal): 8453  
- Explorer: https://basescan.org  
- RPC: https://mainnet.base.org  

Base Sepolia (Testnet)  
- chainId (decimal): 84532  
- Explorer: https://sepolia.basescan.org  
- RPC: https://sepolia.base.org  

---

## How FluxHarbor Works

Primary file: `app/fluxHarbor.ts`

The application performs the following steps:
- Initializes a Base-aware OnchainKit provider
- Renders wallet connection UI for user onboarding
- Pins RPC reads to the selected Base network
- Fetches and displays:
  - RPC-reported chainId
  - latest block height
  - native ETH balance for a provided address
- Provides direct Basescan explorer references

This flow is designed to confirm Base readiness with minimal surface area.

---

## Repository Structure

- `app/`
  - `fluxHarbor.ts`  
    React entry component combining OnchainKit wallet UX and Viem-based Base RPC reads.

Common auxiliary files:
- `package.json`
- `tsconfig.json`
- `index.html` / `main.tsx`
- `.env` (optional)

---

## Libraries and SDKs

- **OnchainKit**  
  Wallet UI components and Base-first primitives  
  https://github.com/coinbase/onchainkit  

- **Viem**  
  JSON-RPC client used for Base onchain reads

---

## Installation & Configuration

Requirements:
- Node.js 18+
- Browser environment with wallet support

Install dependencies using a standard package manager and start a local dev server using React, Vite, or Next.js.

Optional environment variables:
- VITE_BASE_RPC_URL
- VITE_BASE_SEPOLIA_RPC_URL

---

## Runtime Usage

1. Launch the application in a browser
2. Select a Base network (Sepolia for testing, Mainnet for production reads)
3. Connect a wallet using the OnchainKit interface
4. Provide an address for balance inspection
5. Execute onchain reads and review the output
6. Follow generated Basescan links as needed

---

## Base Mainnet Deployment

Deployed on Base Mainnet

Network: Base Mainnet  
chainId (decimal): 8453  
Explorer: https://basescan.org  

Deployed contract address:  
your_adress  

Basescan deployment and verification links:
- Contract address:  
  https://basescan.org/address/your_adress  
- Contract verification (source code):  
  https://basescan.org/address/your_adress#code  

---

## License

MIT License

---

## Author

GitHub: https://github.com/manuroman1903
Public contact (email): baddies.slimmer-0o@icloud.com
Public contact (X): https://x.com/goncharovadash4

---

## Testnet Deployment (Base Sepolia)

To exercise Base tooling in a non-production environment, several reference contracts may be deployed on Base Sepolia for validation.

**Network:** Base Sepolia  
**chainId (decimal):** 84532  
**Explorer:** https://sepolia.basescan.org  

**Contract #1 address:**  
0x2665e50af90838c6d5ea851d38951912d71e2dda

Deployment and verification:
- https://sepolia.basescan.org/address/0x2665e50af90838c6d5ea851d38951912d71e2dda
- https://sepolia.basescan.org/0x2665e50af90838c6d5ea851d38951912d71e2dda/0#code  

**Contract #2 address:**  
0x9f6a76959690c498f0c278f46673cf45bd3381e3

Deployment and verification:
- https://sepolia.basescan.org/address/0x9f6a76959690c498f0c278f46673cf45bd3381e3
- https://sepolia.basescan.org/0x9f6a76959690c498f0c278f46673cf45bd3381e3/0#code  

**Contract #3 address:**  
0xf0856145859fc921a5015abf355ef27647a72442

Deployment and verification:
- https://sepolia.basescan.org/address/0xf0856145859fc921a5015abf355ef27647a72442
- https://sepolia.basescan.org/0xf0856145859fc921a5015abf355ef27647a72442/0#code  

These testnet deployments help confirm Base compatibility, account abstraction–friendly flows, and onchain read behavior prior to any Base Mainnet usage.

