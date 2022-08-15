//SPDX-License-Identifier: UNLINCENSED
pragma solidity ^0.8.16;

contract TripFactory {
    Trip[] public deployedTrips;
    address public contractOwner = 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4;


    function createTrip(address payable captain) public {
        require(msg.sender == contractOwner, "You are not the contract owner");
        Trip newTrip = new Trip(captain);
        deployedTrips.push(newTrip);
    }

    function getDeployedTrips() public view returns (Trip[] memory) {
        return deployedTrips;
    }
}

contract Trip {
    address payable public captain;
    address payable public client;
    string public description;
    string public date;
    uint256 public boatPrice;
    uint256 public totalBalance;
    uint256 public deposit;
    bool public reserved;
    bool public refunded;
    bool public confirmed;   

    modifier restricted() {
        require(msg.sender == captain, "You are not the Captain");
        _;
    }

    modifier onlyClient() {
        require(msg.sender == client, "You are not the Client");
        _;
    }

    constructor(address payable _captain) public {
        captain = _captain;
    }

    function reserve() public payable {
        require(msg.sender != captain, "You cannot be the captain");
        require(msg.value >= deposit, "Funds doesn't meet the requirements");
        require(reserved == false, "Trip is already reserved");

        reserved = true;
        totalBalance += msg.value;
        client = payable(msg.sender);

    }

    function setDescription(string memory _description, uint price) public restricted {
        description = _description;
        boatPrice = price;
        deposit = boatPrice * 2;
    }

    function captainConfirmation(string memory _date) public restricted payable {
        require(msg.value >= deposit);
        require(reserved == true);
        require(confirmed == false);
        confirmed = true;
        date = _date;
        totalBalance += msg.value;
    }

    function captainCancel() public restricted {
        require(reserved == true);
        require(confirmed == false);
        resetContract();
    }

    function approveTrip() public onlyClient {
        require(confirmed == true);
        require(refunded == false);
        
        captain.transfer(boatPrice * 3);
        client.transfer(boatPrice);
        resetContract();
    }

    function refund() public onlyClient {
        require(confirmed == true);
        refunded = true;
    }

    function approveRefund() public restricted {
        require(refunded == true);
        captain.transfer(deposit);
        client.transfer(deposit);
        resetContract();
    }

    function cancellation() public onlyClient{
        require(confirmed == false);
        client.transfer(deposit);
        resetContract();
        
    }

    

    function resetContract() private {
        client = payable(0x0000000000000000000000000000000000000000);
        totalBalance = 0;
        reserved = false;
        refunded = false;
        confirmed = false;
        date = ' ';
    }

    function getSummary() public view returns (uint256, uint256, address, uint256, bool, bool, bool, string memory, address, string memory) {
        return (
            boatPrice,
            deposit,
            captain,
            totalBalance,
            reserved, 
            refunded,
            confirmed,
            description,
            client,
            date
        );
    }
}