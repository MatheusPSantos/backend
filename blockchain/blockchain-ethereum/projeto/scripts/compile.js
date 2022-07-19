const path = require("path");
const fs = require("fs");
const solc = require("solc");
const chalk = require("chalk");
const contractName = 'TestContract.sol';
const contractPath = path.resolve(__dirname, '../contracts', contractName);
const source = fs.readFileSync(contractPath, 'utf-8');

const compilerInput = {
    language: 'Solidity',
    sources: {
        'TestContract.sol': { content: source }
    },
    settings: {
        optimizer: { enabled: true },
        outputSelection: {
            '*': { '*': ['*'] }
        },
    }
};

const inputString = JSON.stringify(compilerInput);
const output = JSON.parse(solc.compile(inputString));

const contractEVM = output.contracts[contractName]['TestContract']['evm'];
const bytecode = contractEVM['bytecode']['object'];
const gasEstimateTotal = contractEVM['gasEstimates']['creation']['totalCost'];
const gasEstimateExecution = contractEVM['gasEstimates']['creation']['executionCost'];

console.log(chalk.yellow('Total Gas Execution:'));
console.log(chalk.green(gasEstimateExecution));
console.log(chalk.yellow('Total Gas Estimation:'));
console.log(chalk.green(gasEstimateTotal));
console.log(chalk.yellow('ByteCode:'));
console.log(chalk.green(bytecode));
