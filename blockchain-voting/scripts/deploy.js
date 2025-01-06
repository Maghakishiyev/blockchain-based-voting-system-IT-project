const hre = require("hardhat");

async function main() {
    console.log("Deploying the contract...");

    // Compile the contract
    await hre.run("compile");

    // Get the contract factory
    const BlockchainVoting = await hre.ethers.getContractFactory("BlockchainVoting");

    // Deploy the contract
    const blockchainVoting = await BlockchainVoting.deploy();
    await blockchainVoting.deployed();

    console.log(`BlockchainVoting deployed to: ${blockchainVoting.address}`);
}

// Handle errors
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
