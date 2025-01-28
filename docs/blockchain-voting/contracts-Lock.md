### Documentation: Lock.sol

---

#### **Overview**
The `Lock` contract is a simple Ethereum smart contract designed to hold funds securely until a specified unlock time. Only the owner of the contract can withdraw the funds once the unlock time has passed.

---

#### **Key Features**
- **Time-Locked Withdrawal**: Funds are locked until a specified timestamp.
- **Owner-Restricted Access**: Only the contract owner can withdraw funds.
- **Event Logging**: Emits events for withdrawal activities.

---

#### **Contract Structure**

1. **State Variables**
   - **`unlockTime`**: A timestamp indicating when funds can be withdrawn.
   - **`owner`**: The address of the contract creator, who is the only one allowed to withdraw funds.

2. **Events**
   - **`Withdrawal(uint amount, uint when)`**: Logs the amount withdrawn and the timestamp of the withdrawal.

---

#### **Functions**

1. **Constructor: `constructor(uint _unlockTime) payable`**
   - Initializes the contract with a specified `unlockTime` and sets the deployer as the owner.
   - Requires that the `unlockTime` is in the future.
   - Accepts Ether during deployment, locking it in the contract.

   **Parameters**:
   - `_unlockTime`: The timestamp after which funds can be withdrawn.

2. **`withdraw()`**
   - Allows the owner to withdraw the locked funds after the `unlockTime`.
   - Verifies:
     - The current timestamp is greater than or equal to `unlockTime`.
     - The caller is the contract owner.
   - Emits a `Withdrawal` event and transfers the contract's balance to the owner.

---

#### **Deployment Requirements**
- Deploy the contract with a specified `unlockTime` in the future.
- Send Ether during deployment to lock funds in the contract.

---

#### **Security Features**
- **Time Lock**: Ensures funds cannot be withdrawn before the `unlockTime`.
- **Owner Verification**: Ensures only the contract owner can withdraw funds.
- **Event Emission**: Logs withdrawals for transparency and traceability.

---

#### **Example Usage**

1. **Deployment**
   - Deploy the contract with an `unlockTime` (e.g., 7 days from now):
     ```solidity
     uint unlockTime = block.timestamp + 7 days;
     Lock lock = new Lock(unlockTime);
     ```
   - Send Ether during deployment to lock it in the contract.

2. **Withdrawal**
   - After the `unlockTime` has passed, the owner can call `withdraw()` to retrieve the funds:
     ```solidity
     lock.withdraw();
     ```

---

