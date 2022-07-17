pragma solidity ^0.4.17;

// Factory in order to create mulitple instances of Trip contract without
// manully constructing a template every time for the captain

// remove description

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
    uint256 public boatPrice;
    Client public info;
    uint256 public totalBalance;
    bool public readyToVote;
    bool public cancelled;
    string public typeOfVote;
    uint256 public deposit;

    mapping(address => bool) addressStatus;

    //client information
    struct Client {
        string name;
        uint256 number;
        bool captainConfirmed;
    }

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

    function reserve(string name, uint256 number) public payable {
        require(msg.sender != captain);
        require(msg.value >= boatPrice * 2);
        require(cancelled == false);

        totalBalance += msg.value;
        client = msg.sender;
        Client memory newClient = Client({
            name: name,
            number: number,
            captainConfirmed: false
        });
        info = newClient;
    }

    function captainConfirmation() public payable restricted {
        require(msg.value >= boatPrice * 2);
        require(client != 0x0000000000000000000000000000000000000000);
        info.captainConfirmed = true;
        totalBalance += msg.value;
    }

    function startVote() public {
        require(info.captainConfirmed == true);
        require(addressStatus[msg.sender] == false);
        readyToVote = true;
        if (msg.sender == captain) {
            typeOfVote = "confirm";
        } else if (msg.sender == client) {
            typeOfVote = "refund";
        }
    }

    function approve() public {
        require(readyToVote == true);
        require(addressStatus[msg.sender] == false);

        if (keccak256(typeOfVote) == keccak256("confirm")) {
            require(msg.sender == client);
            confirmation();
            addressStatus[client] = true;
        } else if (keccak256(typeOfVote) == keccak256("refund")) {
            require(msg.sender == captain);
            refund();
            addressStatus[captain] = true;
        }

        readyToVote = false;
    }

    function confirmation() private {
        captain.transfer(boatPrice * 3);
        client.transfer(boatPrice);
    }

    function refund() private {
        captain.transfer(deposit);
        client.transfer(deposit);
    }

    function cancellation() public {
        require(cancelled == false);
        if (msg.sender == captain) {
            require(client == 0x0000000000000000000000000000000000000000);
            cancelled = true;
        } else if (msg.sender == client) {
            require(info.captainConfirmed == false);
            cancelled = true;
            client.transfer(deposit);
        }
    }

    function getSummary() public view returns (
      uint, uint, address, uint
      ) {
        return (
          boatPrice,
          deposit,
          captain,
          totalBalance
        );
    }
    
    function getTripStatus() public view returns (bool) {
        return cancelled;
    }
}
