const fs = require("fs");
const solc = require('solc')
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

let source = fs.readFileSync('chat.sol', 'utf8');
let compiledContract = solc.compile(source, 1);
let abi = compiledContract.contracts[':Feed'].interface;
let bytecode = compiledContract.contracts[':Feed'].bytecode;

let address = "0x4eeb8a9f55e34540cb65000869e732a40bd4a651";

// Create an instance of the contract
let feedApp = new web3.eth.Contract(JSON.parse(abi));

web3.eth.estimateGas({data: bytecode, from: address}).then(function(gasAmount){
  // Deploy that contract, passing `arguments` to the constructor
  feedApp.deploy({data: bytecode}).send({
    from: address,
    gas: gasAmount,
    gasPrice: '20'
  }).on('error', function(error){
      console.error(error);
    })
    .then(function(newContractInstance){
        console.log(newContractInstance.options.address) // instance with the new contract address
    });
});
