
# BlockchainVoting Contract Documentation

## Overview
This document provides details about the `BlockchainVoting` smart contract, including its events, functions, and deployment details.

---

## Contract Metadata
- **Contract Name:** `BlockchainVoting`
- **Source File:** `contracts/BlockchainVoting.sol`
- **Compiler Version:** `0.8.0`

---

## ABI Details
The following are the events and functions defined in the `BlockchainVoting` smart contract.

### Constructor
- **Type:** `constructor`
- **State Mutability:** `nonpayable`

### Events
#### 1. `ElectionCreated`
Emitted when a new election is created.
- **Inputs:**
  - `electionId (uint256)`: The ID of the election.
  - `name (string)`: Name of the election.
  - `startTime (uint256)`: Start time of the election.
  - `endTime (uint256)`: End time of the election.

#### 2. `ElectionEnded`
Emitted when an election is concluded.
- **Inputs:**
  - `electionId (uint256)`: The ID of the election.
  - `results (uint256[])`: Results of the election.

#### 3. `VoteCast`
Emitted when a vote is cast.
- **Inputs:**
  - `electionId (uint256)`: The ID of the election.
  - `voter (address)`: Address of the voter.
  - `candidateId (uint256)`: ID of the candidate.

#### 4. `VoterRegistered`
Emitted when a voter is registered for an election.
- **Inputs:**
  - `electionId (uint256)`: The ID of the election.
  - `voter (address)`: Address of the registered voter.

---

### Functions
#### 1. `admin`
- **Description:** Retrieves the address of the admin.
- **Inputs:** None
- **Outputs:**
  - `address`: Admin's address.
- **State Mutability:** `view`

#### 2. `createElection`
- **Description:** Creates a new election.
- **Inputs:**
  - `name (string)`: Name of the election.
  - `startTime (uint256)`: Start time.
  - `endTime (uint256)`: End time.
  - `candidates (string[])`: List of candidates.
- **Outputs:** None
- **State Mutability:** `nonpayable`

#### 3. `electionCounter`
- **Description:** Returns the total number of elections created.
- **Inputs:** None
- **Outputs:**
  - `uint256`: Number of elections.
- **State Mutability:** `view`

#### 4. `elections`
- **Description:** Fetches details of an election by ID.
- **Inputs:**
  - `uint256`: Election ID.
- **Outputs:**
  - `id (uint256)`: Election ID.
  - `name (string)`: Name of the election.
  - `startTime (uint256)`: Start time.
  - `endTime (uint256)`: End time.
  - `isActive (bool)`: Active status.
- **State Mutability:** `view`

#### 5. `endElection`
- **Description:** Ends an active election.
- **Inputs:**
  - `electionId (uint256)`: Election ID.
- **Outputs:** None
- **State Mutability:** `nonpayable`

#### 6. `getCandidates`
- **Description:** Retrieves the list of candidates for an election.
- **Inputs:**
  - `electionId (uint256)`: Election ID.
- **Outputs:**
  - `string[]`: List of candidate names.
- **State Mutability:** `view`

#### 7. `getElectionDetails`
- **Description:** Retrieves detailed information about an election.
- **Inputs:**
  - `electionId (uint256)`: Election ID.
- **Outputs:**
  - `name (string)`: Name of the election.
  - `startTime (uint256)`: Start time.
  - `endTime (uint256)`: End time.
  - `isActive (bool)`: Active status.
  - `candidates (string[])`: List of candidates.
  - `results (uint256[])`: Voting results.
- **State Mutability:** `view`

#### 8. `getPaginatedElections`
- **Description:** Retrieves elections with pagination.
- **Inputs:**
  - `offset (uint256)`: Offset for pagination.
  - `limit (uint256)`: Maximum number of results to fetch.
  - `filterState (uint8)`: Filter based on active/inactive status.
- **Outputs:**
  - `ids (uint256[])`: List of election IDs.
  - `names (string[])`: List of election names.
  - `startTimes (uint256[])`: Start times.
  - `endTimes (uint256[])`: End times.
  - `states (bool[])`: Active statuses.
- **State Mutability:** `view`

#### 9. `registerVoter`
- **Description:** Registers a voter for a specific election.
- **Inputs:**
  - `electionId (uint256)`: Election ID.
  - `voter (address)`: Voter address.
- **Outputs:** None
- **State Mutability:** `nonpayable`

#### 10. `vote`
- **Description:** Casts a vote in an election.
- **Inputs:**
  - `electionId (uint256)`: Election ID.
  - `candidateId (uint256)`: Candidate ID.
- **Outputs:** None
- **State Mutability:** `nonpayable`

#### 11. `getVoterProfile`
- **Description:** Retrieves a voter's profile in an election.
- **Inputs:**
  - `electionId (uint256)`: Election ID.
  - `voter (address)`: Voter address.
- **Outputs:**
  - `bool`: Whether the voter is registered.
  - `bool`: Whether the voter has voted.
  - `uint256`: Candidate ID voted for.
- **State Mutability:** `view`

---

## Bytecode
The contract includes both **bytecode** and **deployed bytecode** necessary for deployment.

---

## Error Handling
The contract emits descriptive errors for invalid operations, such as:
- Trying to interact with a non-existent election.
- Attempting actions after an election has ended.

---

## Deployment
- **Bytecode:** Contains the bytecode for deploying the contract on Ethereum-compatible blockchains.
- **Compiler Compatibility:** Ensure the compiler version is `0.8.x` to avoid discrepancies.

---
