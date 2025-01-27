# Blockchain Voting Smart Contract Documentation

## Overview
The [BlockchainVoting.sol] contract manages a voting system where elections can be created, voters can be registered, and votes can be cast and tallied.

## Structs
- **Voter**: Contains information about each voter:
  - `isRegistered`: Indicates if the voter is registered.
  - `hasVoted`: Indicates if the voter has cast a vote.
  - `vote`: Stores the candidate ID that the voter voted for.

- **Election**: Contains information about each election:
  - `id`: Unique identifier for the election.
  - `name`: Name of the election.
  - `startTime`: Start time of the election.
  - `endTime`: End time of the election.
  - `candidates`: List of candidates participating in the election.
  - `voters`: Mapping of voter addresses to their `Voter` information.
  - `voterAddresses`: Array to store addresses of registered voters.
  - `votes`: Mapping of candidate IDs to their vote counts.
  - `isActive`: Indicates if the election is currently active.

## Events
- `ElectionCreated`: Emitted when a new election is created.
- `VoterRegistered`: Emitted when a voter is registered.
- `VoteCast`: Emitted when a vote is cast.
- `ElectionEnded`: Emitted when an election ends and results are tallied.

## Functions
- `createElection`: Allows the admin to create a new election.
- `registerVoter`: Allows the admin to register a voter for a specific election.
- `vote`: Allows registered voters to cast their votes.
- `endElection`: Allows the admin to end an election and tally the results.
- Various getter functions to retrieve election and voter information.

## Error Handling
The contract includes various checks to ensure that only the admin can perform certain actions and that elections are conducted within valid time frames.