pragma solidity ^0.4.17;

// Factory in order to create mulitple instances of Trip contract without
// manully constructing a template every time for the captain

contract TripFactory {
    address[] public deployedTrips;

    function createTrip(uint256 price) public {
        address newTrip = new Trip(price, msg.sender);
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
    bool public readyToVote;

    bool public cancelled;
    bool public reserved;
    bool public refunded;
    bool public clientConfirmed;
    bool public captainConfirmed;

    uint8 public typeOfVote;
    uint256 public deposit;

    mapping(address => bool) addressStatus;

    
    

    modifier restricted() {
        require(msg.sender == captain);
        _;
    }

    modifier onlyClient() {
        require(msg.sender == client);
        _;
    }

    function Trip(uint256 _price, address _captain) public {
        captain = _captain;
        boatPrice = _price;
        deposit = boatPrice * 2;
    }

    function reserve() public payable {
        require(msg.sender != captain);
        require(msg.value >= boatPrice * 2);
        require(reserved == false);

        reserved = true;
        totalBalance += msg.value;
        client = msg.sender;

    }

    function setDescription(string _description) public restricted {
        description = _description;
    }

    function captainConfirmation() public restricted payable {
        require(msg.value >= boatPrice * 2);
        require(client != 0x0000000000000000000000000000000000000000);
        captainConfirmed = true;
        totalBalance += msg.value;

    }


    function startVote() public {
        require(captainConfirmed == true);
        require(addressStatus[msg.sender] == false);
        readyToVote = true;
        if(msg.sender == captain){
            typeOfVote = 0;
        } else if(msg.sender == client){
            typeOfVote = 1;
        }
    }

    function approve() public {
        require(readyToVote == true);
        require(addressStatus[msg.sender] == false);

        if (typeOfVote == 0) {
            require(msg.sender == client);
            confirmation();
            addressStatus[client] = true;
        } else if (typeOfVote == 1) {
            require(msg.sender == captain);
            refund();
            addressStatus[captain] = true;
            refunded = true;
        }

        readyToVote = false;
    }

    function confirmation() private {
        captain.transfer(boatPrice * 3);
        client.transfer(boatPrice);
        clientConfirmed = true;
    }

    function refund() private {
        captain.transfer(deposit);
        client.transfer(deposit);
        refunded = true;
    }

    function cancellation() public {
        require(cancelled == false);
        if(msg.sender == captain){
            require(client == 0x0000000000000000000000000000000000000000);
            cancelled = true;  
        } else if(msg.sender == client){
            require(captainConfirmed == false);
            client.transfer(deposit);
            reserved = false;
        }
    }

    function getSummary() public view returns (uint, uint, address, uint, bool, bool, uint8) {
        return (
          boatPrice,
          deposit,
          captain,
          totalBalance,
          cancelled,
          readyToVote,
          typeOfVote
        );
    }
}
