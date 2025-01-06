// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BlockchainVoting {
    // Struct to store voter information
    struct Voter {
        bool isRegistered;
        bool hasVoted;
        uint vote; // Candidate ID
    }

    // Struct to store election information
    struct Election {
        uint id;
        string name;
        uint startTime;
        uint endTime;
        string[] candidates;
        mapping(address => Voter) voters;
        mapping(uint => uint) votes; // Candidate ID -> vote count
        bool isActive;
    }

    // State variables
    address public admin;
    uint public electionCounter;
    mapping(uint => Election) public elections;

    // Events
    event ElectionCreated(
        uint electionId,
        string name,
        uint startTime,
        uint endTime
    );
    event VoterRegistered(uint electionId, address voter);
    event VoteCast(uint electionId, address voter, uint candidateId);
    event ElectionEnded(uint electionId, uint[] results);

    // Modifiers
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }

    modifier electionExists(uint electionId) {
        require(
            electionId <= electionCounter &&
                elections[electionId].id == electionId,
            "Election does not exist"
        );
        _;
    }

    modifier electionIsActive(uint electionId) {
        require(elections[electionId].isActive, "Election is not active");
        require(
            block.timestamp >= elections[electionId].startTime &&
                block.timestamp <= elections[electionId].endTime,
            "Election is not within the active time frame"
        );
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    // Function to create a new election
    function createElection(
        string memory name,
        uint startTime,
        uint endTime,
        string[] memory candidates
    ) public onlyAdmin {
        require(startTime < endTime, "Start time must be before end time");
        require(candidates.length > 0, "Must have at least one candidate");

        electionCounter++;
        Election storage newElection = elections[electionCounter];
        newElection.id = electionCounter;
        newElection.name = name;
        newElection.startTime = startTime;
        newElection.endTime = endTime;
        newElection.isActive = true;
        newElection.candidates = candidates;

        emit ElectionCreated(electionCounter, name, startTime, endTime);
    }

    // Function to register a voter
    function registerVoter(
        uint electionId,
        address voter
    ) public onlyAdmin electionExists(electionId) {
        Election storage election = elections[electionId];
        require(
            !election.voters[voter].isRegistered,
            "Voter is already registered"
        );

        election.voters[voter].isRegistered = true;

        emit VoterRegistered(electionId, voter);
    }

    // Function to cast a vote
    function vote(
        uint electionId,
        uint candidateId
    ) public electionExists(electionId) electionIsActive(electionId) {
        Election storage election = elections[electionId];
        Voter storage voter = election.voters[msg.sender];

        require(
            voter.isRegistered,
            "You are not registered to vote in this election"
        );
        require(!voter.hasVoted, "You have already voted");
        require(
            candidateId < election.candidates.length,
            "Invalid candidate ID"
        );

        voter.hasVoted = true;
        voter.vote = candidateId;
        election.votes[candidateId]++;

        emit VoteCast(electionId, msg.sender, candidateId);
    }

    // Function to end an election and tally results
    function endElection(
        uint electionId
    ) public onlyAdmin electionExists(electionId) {
        Election storage election = elections[electionId];
        require(election.isActive, "Election is already ended");
        require(
            block.timestamp > election.endTime,
            "Election has not ended yet"
        );

        election.isActive = false;

        uint[] memory results = new uint[](election.candidates.length);
        for (uint i = 0; i < election.candidates.length; i++) {
            results[i] = election.votes[i];
        }

        emit ElectionEnded(electionId, results);
    }

    // Function to fetch election results
    function getResults(
        uint electionId
    ) public view electionExists(electionId) returns (uint[] memory) {
        Election storage election = elections[electionId];
        require(!election.isActive, "Election is still active");

        uint[] memory results = new uint[](election.candidates.length);
        for (uint i = 0; i < election.candidates.length; i++) {
            results[i] = election.votes[i];
        }
        return results;
    }

    // Function to fetch election candidates
    function getCandidates(
        uint electionId
    ) public view electionExists(electionId) returns (string[] memory) {
        return elections[electionId].candidates;
    }
}
