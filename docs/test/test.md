# Test Documentation

## Lock.js

### Overview
The [Lock.js](blockchain-based-voting-system-IT-project/blockchain-voting/test/Lock.js:0:0-0:0) script contains tests for the [Lock](blockchain-based-voting-system-IT-project/blockchain-voting/test/Lock.js:8:2-25:3) smart contract using Hardhat and Chai.

### Dependencies
- **Hardhat Toolbox**: For network helpers and testing utilities.
- **Chai**: Assertion library for testing.

### Test Suite
1. **Fixture Setup**:
   - The [deployOneYearLockFixture](blockchain-based-voting-system-IT-project/blockchain-voting/test/Lock.js:8:2-25:3) function sets up the contract deployment and the initial state for tests.

2. **Deployment Tests**:
   - Validates that the contract correctly sets the unlock time and owner.

3. **Funds Tests**:
   - Ensures that the contract receives and stores the locked funds.

4. **Unlock Time Validation**:
   - Checks that the unlock time is set in the future.

5. **Withdrawal Tests**:
   - Tests various scenarios for withdrawing funds, including valid and invalid cases.

### Error Handling
The tests include validations for expected errors when conditions are not met (e.g., trying to withdraw too soon).