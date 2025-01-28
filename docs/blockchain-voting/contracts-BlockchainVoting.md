### Documentation: BlockchainVoting.sol

---

#### **Overview**
The `BlockchainVoting` contract is a blockchain-based voting system allowing for secure, transparent, and decentralized elections. It provides functionality to manage elections, register voters, cast votes, and view results.

---

#### **Key Features**
- **Admin-based Control**: Only the contract admin can create elections, register voters, and end elections.
- **Voter Registration**: Allows registering individual voters or multiple voters in one transaction.
- **Election Management**: Elections have a start and end time, candidates, and states (active/inactive).
- **Secure Voting**: Prevents double voting and ensures only registered voters can vote.
- **Result Tallying**: Provides election results after the election ends.
- **Pagination and Filtering**: Supports paginated queries for elections.

---

#### **Contract Structure**

1. **Structs**
   - **`Voter`**: Stores voter registration, voting status, and the candidate voted for.
   - **`Election`**: Stores election details, candidates, voters, and voting results.

2. **State Variables**
   - **`admin`**: The admin address with exclusive permissions.
   - **`electionCounter`**: Tracks the total number of elections.
   - **`elections`**: Mapping of election IDs to `Election` structs.

3. **Events**
   - `ElectionCreated`: Triggered when an election is created.
   - `VoterRegistered`: Triggered when a voter is registered.
   - `VoteCast`: Triggered when a vote is cast.
   - `ElectionEnded`: Triggered when an election ends.

4. **Modifiers**
   - **`onlyAdmin`**: Restricts function access to the admin.
   - **`electionExists`**: Ensures the specified election exists.
   - **`electionIsActive`**: Validates if the election is active and within its time frame.

---

#### **Functions**

##### **Admin Functions**
1. **`createElection(string memory name, uint startTime, uint endTime, string[] memory candidates)`**
   - Creates a new election.
   - Emits `ElectionCreated`.

2. **`registerVoter(uint electionId, address voter)`**
   - Registers an individual voter for a specific election.
   - Emits `VoterRegistered`.

3. **`registerMultipleVoters(uint electionId, address[] memory voters)`**
   - Registers multiple voters in a single transaction.
   - Emits `VoterRegistered` for each voter.

4. **`endElection(uint electionId)`**
   - Ends an election and calculates results.
   - Emits `ElectionEnded`.

##### **Voting Functions**
5. **`vote(uint electionId, uint candidateId)`**
   - Allows a registered voter to cast a vote for a specific candidate.
   - Emits `VoteCast`.

##### **Query Functions**
6. **`getVoters(uint electionId)`**
   - Returns a list of voter addresses for an election.

7. **`getVoterProfile(uint electionId, address voter)`**
   - Fetches registration and voting details for a voter.

8. **`getResults(uint electionId)`**
   - Returns the results of an election (vote counts per candidate).

9. **`getCandidates(uint electionId)`**
   - Retrieves the list of candidates for an election.

10. **`getElectionDetails(uint electionId)`**
    - Provides detailed information about an election, including vote counts.

11. **`getVotersWithDetails(uint electionId)`**
    - Returns detailed voter information (registration, voting status, votes).

12. **`getPaginatedElections(uint offset, uint limit, uint8 filterState)`**
    - Retrieves a paginated list of elections based on their state (all, active, finished).

##### **Fallback**
13. **`receive()`**
    - Rejects incoming Ether transfers to the contract.

---

#### **Deployment Requirements**
- Deploy using an Ethereum-compatible environment (e.g., Hardhat or Truffle).
- Ensure the admin address is set during deployment.

---

#### **Security Features**
- **Access Control**: Only admin can perform critical actions like creating elections and registering voters.
- **Time Validation**: Ensures voting is only allowed within the specified election period.
- **Double Voting Prevention**: Enforces that voters can vote only once per election.

---

