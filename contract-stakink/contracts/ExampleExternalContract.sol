// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ExampleExternalContract {

  bool public completed;

    // // Function to receive Ether. msg.data must be empty
    // receive() external payable {}

    // // Fallback function is called when msg.data is not empty
    // fallback() external payable {}


  function complete() public payable{
    require(address(this).balance>0,"ExampleExternalContract : The balance of the smart contract is not enough");
    completed = true;
  }

}
