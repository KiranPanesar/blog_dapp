web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
web3.eth.defaultAccount = web3.eth.accounts[0]

abi = '[{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"posts","outputs":[{"name":"datetime","type":"uint256"},{"name":"body","type":"string"},{"name":"authorAddress","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"getUsername","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"body","type":"string"}],"name":"createPost","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"addressString","type":"string"}],"name":"getPosts","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"username","type":"string"}],"name":"setUsername","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"usernames","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"}]';

VotingContract = web3.eth.contract(JSON.parse(abi));
// In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
contractInstance = VotingContract.at('0xd041B1B8477bcC0e1Aed0C2db79875C08BdD59e7');

function setUsername() {
  var username_field = $("#username_field").val();

  contractInstance.setUsername(username_field, {from: web3.eth.accounts[0]}, function() {
    console.log(contractInstance.getUsername.call());
    $("#username_label").html(contractInstance.getUsername.call());
  });
}

function createPost() {
  var post_body = $('#post_body_area').val();

  contractInstance.createPost(post_body, {from: web3.eth.accounts[0]}, function() {
    console.log("DONE");
  });
}

$(document).ready(function() {
  $("#username_label").html(contractInstance.getUsername.call());
});
