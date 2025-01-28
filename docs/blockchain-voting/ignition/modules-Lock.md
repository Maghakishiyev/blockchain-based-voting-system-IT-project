### Documentation: Lock Deployment Module

---

#### **Overview**
This module is a **Hardhat Ignition** script designed to deploy the `Lock` smart contract. It allows for customizable parameters such as the unlock time and the locked amount of Ether. This script simplifies the deployment process and ensures reproducibility.

---

#### **Key Features**
- **Customizable Unlock Time**: Allows specifying the time at which the funds can be unlocked.
- **Configurable Locked Amount**: Enables setting the amount of Ether locked in the contract.
- **Simplified Deployment**: Automates the deployment process using Hardhat Ignition.

---

#### **File Content**

##### **Constants**
1. **`JAN_1ST_2030`**: 
   - Default unlock time, set to January 1, 2030 (Unix timestamp: `1893456000`).
2. **`ONE_GWEI`**:
   - Default locked amount, set to 1 Gwei (`1,000,000,000` Wei).

##### **Deployment Logic**
1. **`buildModule`**:
   - Creates the deployment module, named `"LockModule"`.
   - Uses the following parameters:
     - **`unlockTime`**: Defaults to `JAN_1ST_2030` if not provided.
     - **`lockedAmount`**: Defaults to `ONE_GWEI` if not provided.
   - Deploys the `Lock` contract with:
     - **Arguments**: `[unlockTime]` passed to the contract constructor.
     - **Value**: Ether amount specified by `lockedAmount`.

2. **Return Value**:
   - Exports the deployed `Lock` contract.

---

#### **How to Use**

##### **Setup**
1. Install Hardhat and Ignition:
   ```bash
   npm install hardhat @nomicfoundation/hardhat-ignition
   ```

2. Place this script in the `modules` directory of your Hardhat project.

##### **Running the Deployment**
1. Run the deployment script:
   ```bash
   npx hardhat ignition run LockModule
   ```

2. Customize parameters:
   - Pass custom values for `unlockTime` or `lockedAmount` using the Hardhat CLI.

##### **Example**
Deploy the `Lock` contract with custom parameters:
```javascript
const customUnlockTime = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now
const customLockedAmount = 10_000_000_000n; // 10 Gwei

const module = require('./LockModule');
module.build({ unlockTime: customUnlockTime, lockedAmount: customLockedAmount });
```

---
