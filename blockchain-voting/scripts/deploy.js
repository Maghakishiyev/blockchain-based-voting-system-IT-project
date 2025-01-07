const hre = require('hardhat');
const fs = require('fs');

async function main() {
    const deployedAddress = process.env.DEPLOYED_CONTRACT_ADDRESS;

    if (deployedAddress) {
        console.log(`Contract already deployed at address: ${deployedAddress}`);
        return;
    }

    console.log('Deploying the contract...');

    // Compile the contract
    await hre.run('compile');

    const BlockchainVoting = await hre.ethers.getContractFactory(
        'BlockchainVoting'
    );
    const blockchainVoting = await BlockchainVoting.deploy();
    await blockchainVoting.deployed();

    const contractAddress = blockchainVoting.address;
    console.log(`BlockchainVoting deployed to: ${contractAddress}`);

    // Save the contract address to a file
    fs.writeFileSync('contract-address.txt', contractAddress);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
