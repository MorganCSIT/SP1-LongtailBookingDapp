pragma solidity ^0.4.17;

contract TripFactory {
    address[] public deployedTrips;

    function createTrip(address _captain) public { // change parameter from uint price to address _captain
        address newTrip = new Trip(_captain); // price, msg.sender -> _captain
        deployedTrips.push(newTrip);
    }

    function getDeployedTrips() public view returns (address[]) {
        return deployedTrips;
    }
}

contract Trip {
    address public captain;
    address public client;
    string public description;
    uint256 public boatPrice;
    uint256 public totalBalance;
    uint256 public deposit;
    bool public reserved;
    bool public refunded;
    bool public confirmed;   
    

    modifier restricted() {
        require(msg.sender == captain);
        _;
    }

    modifier onlyClient() {
        require(msg.sender == client);
        _;
    }

    function Trip(address _captain) public { // removed price from parameter
        captain = _captain; // removed boatPrice and deposit
    }

    function reserve() public payable {
        require(msg.sender != captain);
        require(msg.value >= deposit);
        require(reserved == false);

        reserved = true;
        totalBalance += msg.value;
        client = msg.sender;

    }

    function setDescription(string _description) public restricted {
        description = _description;
    }

    function captainConfirmation() public restricted payable {
        require(msg.value >= deposit);
        require(reserved == true);
        require(confirmed == false);
        confirmed = true;
        totalBalance += msg.value;

    }

// removed start vote and changed approve
// added confirmation function to approve function
//once captain has confirmed, either the client can confirm the trip or choose to refund which then the captain has to approve

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
        client = 0x0000000000000000000000000000000000000000;
        totalBalance = 0;
        reserved = false;
        refunded = false;
        confirmed = false;
    }

    function getSummary() public view returns (uint256, uint256, address, uint256, bool, bool, bool, string, address) {
        return (
            boatPrice,
            deposit,
            captain,
            totalBalance,
            reserved, 
            refunded,
            confirmed,
            description,
            client
        );
    }
}