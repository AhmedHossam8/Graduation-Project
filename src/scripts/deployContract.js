const Web3 = require('web3');
const contractAbi = require('../contracts/grade.sol'); // Replace with ABI of your contract
const web3 = new Web3('http://localhost:7545'); // Ganache RPC endpoint

async function deployContract() {
    try {
        const accounts = await web3.eth.getAccounts();
        const deployer = accounts[0];

        // Create a new contract instance
        const contract = new web3.eth.Contract(contractAbi);

        // Deploy the contract and set grades
        const deployedContract = await contract.deploy({
            data: '0x' + contractBytecode.object, // Add '0x' prefix to the bytecode
            arguments: [registrationNumber, grade, courseIds, courseGrades]
        }).send({
            from: deployer,
            gas: 6721975, // Gas limit
            gasPrice: '20000000000' // Gas price in wei (optional)
        });

        console.log('Contract deployed at:', deployedContract.options.address);
    } catch (error) {
        console.error('Error deploying contract:', error);
    }
}

// Call deployContract function
deployContract();
