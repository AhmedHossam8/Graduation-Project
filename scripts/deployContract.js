const Web3 = require('web3');
const contractAbi = require('./GradeBook.json'); // Replace with ABI of your contract
const contractBytecode = require('./GradeBookBytecode.json'); // Replace with bytecode of your contract
const web3 = new Web3('http://localhost:7545'); // Ganache RPC endpoint

const gradeModel = require('./models/grade'); // Import grade.js model

async function deployContract() {
    try {
        const accounts = await web3.eth.getAccounts();
        const deployer = accounts[0];

        // Fetch grade data from the model
        const grades = await gradeModel.getGrades();
        const registrationNumber = 123; // Example registration number
        const grade = 90; // Example grade
        const courseIds = grades.map(grade => grade.courseId);
        const courseGrades = grades.map(grade => grade.grade);

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
