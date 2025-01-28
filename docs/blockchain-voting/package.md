### Documentation: `package.json`

---

#### **Overview**
The `package.json` file is a configuration file for the **Blockchain Voting** project, managing its dependencies, metadata, and scripts. It is essential for defining the Node.js project structure and facilitating development tasks such as deploying smart contracts.

---

#### **Key Sections**

1. **Project Metadata**
   - **`name`**: The name of the project (`blockchain-voting`).
   - **`version`**: Version number (`1.0.0`).
   - **`description`**: (Empty) A brief description can be added to provide context about the project.
   - **`main`**: Entry point for the application (`index.js`).

2. **Scripts**
   - **`deploy`**: Runs the Hardhat deployment script on the **Sepolia** testnet:
     ```bash
     npx hardhat run scripts/deploy.js --network sepolia
     ```

3. **Dependencies**
   - **`@nomiclabs/hardhat-ethers`**: Hardhat plugin for Ethereum smart contract development with Ethers.js (`v2.2.3`).
   - **`dotenv`**: Loads environment variables from a `.env` file (`v16.4.7`).
   - **`ethers`**: A library for Ethereum blockchain interactions (`v5.7.2`).
   - **`hardhat`**: A development environment for Ethereum smart contracts (`v2.22.17`).

4. **Other Fields**
   - **`keywords`**: (Empty) Keywords can be added for better discoverability.
   - **`author`**: (Empty) The author of the project can be specified.
   - **`license`**: Indicates the license type (`ISC`).

---

#### **Scripts**

- **Deploy Smart Contracts**
  - Command:
    ```bash
    npm run deploy
    ```
  - Description: Deploys smart contracts to the **Sepolia** testnet using the deployment script (`scripts/deploy.js`).

---

#### **How to Use**

1. **Install Dependencies**
   - Run the following command to install the necessary dependencies:
     ```bash
     npm install
     ```

2. **Environment Setup**
   - Ensure the `.env` file is properly configured with the required values:
     ```plaintext
     ALCHEMY_API_KEY=your-alchemy-api-key
     WALLET_PRIVATE_KEY=your-wallet-private-key
     ETHERSCAN_API_KEY=your-etherscan-api-key
     ```

3. **Deploy Contracts**
   - Use the `deploy` script to deploy contracts:
     ```bash
     npm run deploy
     ```

---
