### Documentation: `hardhat.config.js`

---

#### **Overview**
The `hardhat.config.js` file configures the Hardhat development environment for the **Blockchain Voting** project. It sets up the Solidity compiler, network configurations, and third-party integrations, enabling smooth development, testing, and deployment of Ethereum smart contracts.

---

#### **Key Features**

1. **Solidity Compiler Configuration**:
   - Specifies the Solidity version used in the project as `0.8.0`.

2. **Network Configuration**:
   - Configures the **Sepolia** testnet for deploying and interacting with smart contracts.
   - Utilizes **Alchemy** as the RPC provider for interacting with the Ethereum blockchain.

3. **Environment Variables**:
   - Uses the `dotenv` package to securely load sensitive data from a `.env` file, including:
     - **`ALCHEMY_API_KEY`**: The API key for accessing Alchemy services.
     - **`WALLET_PRIVATE_KEY`**: The private key for signing transactions on the blockchain.
     - **`ETHERSCAN_API_KEY`**: The API key for verifying contracts on Etherscan.

4. **Etherscan Integration**:
   - Enables contract verification on **Etherscan** using the provided API key.

---

#### **Configuration Breakdown**

1. **Imports**:
   - `@nomiclabs/hardhat-ethers`: Plugin for Ethereum smart contract interactions using Ethers.js.
   - `dotenv`: Loads environment variables from a `.env` file.

2. **`solidity`**:
   - Specifies the Solidity compiler version as `0.8.0`.

3. **`networks`**:
   - Configures the **Sepolia** testnet:
     - `url`: Endpoint to connect to Sepolia using Alchemy.
     - `accounts`: Uses the wallet private key for deploying and interacting with contracts.

4. **`etherscan`**:
   - Configures the **Etherscan API key** for contract verification.

---

#### **Example `.env` File**
The `.env` file should contain the following environment variables:
```plaintext
ALCHEMY_API_KEY=your-alchemy-api-key
WALLET_PRIVATE_KEY=your-wallet-private-key
ETHERSCAN_API_KEY=your-etherscan-api-key
```

---

#### **How to Use**

1. **Setup**:
   - Install dependencies:
     ```bash
     npm install @nomiclabs/hardhat-ethers dotenv
     ```
   - Create a `.env` file and populate it with the required values.

2. **Compile Contracts**:
   ```bash
   npx hardhat compile
   ```

3. **Deploy Contracts**:
   - Deploy to the Sepolia testnet using a deployment script:
     ```bash
     npx hardhat run scripts/deploy.js --network sepolia
     ```

4. **Verify Contracts**:
   - Use the Etherscan plugin for verification:
     ```bash
     npx hardhat verify --network sepolia <contract_address>
     ```

---
