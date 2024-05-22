const Web3 = require('web3');

// Initialize web3 with Ganache RPC endpoint
const web3 = new Web3('http://127.0.0.1:7545');

// Function to get deployer address
async function getDeployerAddress() {
    const accounts = await web3.eth.getAccounts();
    return accounts[0]; // Use the first address as deployer address
}

// Function to connect MongoDB
import { MongoClient } from 'mongodb';
async function connectToMongo() {
    const uri = 'mongodb://localhost:27017/';
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        // Perform Database Operations
        // Function to insert sample data
        async function insertSampleData() {
            try {
                // Insert sample data here
                await Student.create([
                    {
                        firstName: 'Johnny',
                        lastName: 'Mark',
                        email: 'johnny@example.com',
                        phoneNumber: '01234567890',
                        registrationNumber: '12346'
                    }
                ]);
            } catch (error) {
                console.error('Error inserting sample data:', error);
            } finally {
                // Close connection after insertion
                mongoose.connection.close();
            }
        }
    }
    catch (error) {
        console.log('Failed to Connect to MongoDB', error);
    }
    finally {
        await client.close();
    }
}
connectToMongo();

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

export default {
    web3,
    deployContract
};
