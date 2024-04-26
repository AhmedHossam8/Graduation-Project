const Web3 = require('web3');

// Initialize web3 with Ganache RPC endpoint
const web3 = new Web3('http://127.0.0.1:7545');

// Function to get deployer address
async function getDeployerAddress() {
    const accounts = await web3.eth.getAccounts();
    return accounts[0]; // Use the first address as deployer address
}

// Function to deploy a contract
async function deployContract(contractData, constructorArgs) {
    try {
        const deployerAddress = await getDeployerAddress();

        // Load compiled contract data
        const contract = new web3.eth.Contract(contractData.abi);

        // Deploy the contract with specified constructor arguments
        const deployedContract = await contract.deploy({
            data: contractData.bytecode,
            arguments: constructorArgs
        }).send({
            from: deployerAddress,
            gas: 3000000, // Adjust gas limit as needed
            gasPrice: '1000000000' // Adjust gas price as needed
        });

        console.log('Contract deployed at:', deployedContract.options.address);
        return deployedContract.options.address;
    } catch (error) {
        console.error('Error deploying contract:', error);
        throw error;
    }
}

// Example: Get the latest block number
web3.eth.getBlockNumber()
    .then(blockNumber => {
        console.log('Latest block number:', blockNumber);
    })
    .catch(error => {
        console.error('Error getting block number:', error);
    });

module.exports = {
    web3,
    deployContract
};
