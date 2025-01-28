### Documentation: Deploy Script (`deploy.js`)

---

#### **Overview**
This script is used to deploy the `BlockchainVoting` smart contract to an Ethereum-compatible blockchain network using the Hardhat development environment. It ensures the contract is compiled, deployed, and its address is saved for future reference.

---

#### **Key Features**
- **Deployment Check**: Verifies if the contract is already deployed using an environment variable.
- **Contract Compilation**: Ensures the contract is compiled before deployment.
- **Automated Deployment**: Deploys the `BlockchainVoting` contract and logs the deployed address.
- **Persistence**: Saves the deployed contract address to a file for later use.

---

#### **Script Workflow**

1. **Environment Variable Check**
   - Checks for the presence of `DEPLOYED_CONTRACT_ADDRESS`.
   - If the address exists, logs it and skips the deployment process.

2. **Compilation**
   - Ensures the contract is compiled before deployment:
     ```javascript
     await hre.run('compile');
     ```

3. **Deployment**
   - Fetches the `BlockchainVoting` contract factory using Hardhat:
     ```javascript
     const BlockchainVoting = await hre.ethers.getContractFactory('BlockchainVoting');
     ```
   - Deploys the contract and waits for it to be confirmed:
     ```javascript
     const blockchainVoting = await BlockchainVoting.deploy();
     await blockchainVoting.deployed();
     ```

4. **Address Logging**
   - Logs the deployed contract address:
     ```javascript
     console.log(`BlockchainVoting deployed to: ${contractAddress}`);
     ```

5. **Saving the Address**
   - Saves the deployed address to a file named `contract-address.txt`:
     ```javascript
     fs.writeFileSync('contract-address.txt', contractAddress);
     ```

6. **Error Handling**
   - Catches errors during deployment and exits with a non-zero code:
     ```javascript
     main().catch((error) => {
         console.error(error);
         process.exitCode = 1;
     });
     ```

---

#### **How to Use**

1. **Setup**
   - Install dependencies:
     ```bash
     npm install hardhat ethers
     ```

   - Ensure the `BlockchainVoting` contract exists in the project.

2. **Run the Script**
   - Execute the deployment script:
     ```bash
     npx hardhat run scripts/deploy.js
     ```

3. **Environment Variable**
   - To skip deployment, set the `DEPLOYED_CONTRACT_ADDRESS` environment variable:
     ```bash
     export DEPLOYED_CONTRACT_ADDRESS=0xYourContractAddress
     ```

4. **Output**
   - Logs the deployed address:
     ```
     BlockchainVoting deployed to: 0xYourContractAddress
     ```
   - Saves the address to `contract-address.txt`.

---

