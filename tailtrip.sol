pragma solidity ^0.4.17;

// Factory in order to create mulitple instances of Trip contract without
// manully constructing a template every time for the captain

contract TripFactory {
    address[] public deployedTrips;

    function createTrip(uint256 price, string description) public {
        address newTrip = new Trip(price, msg.sender, description);
        deployedTrips.push(newTrip);
    }

    function getTrips() public view returns (address[]) {
        return deployedTrips;
    }
}

contract Trip {
    address public captain;
    address public client;
    uint256 public boatPrice;
    string public description;
    Client public info;

    //client information
    struct Client {
        string name;
        uint256 number;
    }

    modifier restricted() {
        require(msg.sender == captain);
        _;
    }

    modifier onlyClient() {
        require(msg.sender == client);
        _;
    }

    function Trip(
        uint256 _price,
        address _captain,
        string _description
    ) public payable {
        require(msg.value >= _price * 2);
        captain = _captain;
        boatPrice = _price;
        description = _description;
    }

    function reserve(string name, uint256 number) public payable {
        require(msg.sender != captain);
        require(msg.value >= boatPrice * 2);
        require(cancelled == false);

        client = msg.sender;

        Client memory newClient = Client({name: name, number: number});

        info = newClient;
    }

    bool public readyToVote;
    uint256 public yesCount = 0;
    bool public cancelled;
    string public typeOfVote;

    mapping(address => bool) voted;

    function startVote(string _typeOfVote) public restricted {
        typeOfVote = _typeOfVote;
        readyToVote = true;
    }

    function approve() public onlyClient {
        require(readyToVote == true);
        require(voted[msg.sender] == false);
        yesCount++;
        voted[msg.sender] = true;
    }

    function closeVote() public {
        require(readyToVote == true && yesCount == 1);

        if (keccak256(typeOfVote) == keccak256("confirm")) {
            confirmation();
        } else if (keccak256(typeOfVote) == keccak256("refund")) {
            refund();
        }

        readyToVote = false;
    }

    function confirmation() private {
        captain.transfer(boatPrice * 3);
        client.transfer(boatPrice);
    }

    function refund() private {
        captain.transfer(boatPrice * 2);
        client.transfer(boatPrice * 2);
    }

    function cancellation() public restricted {
        require(client == 0x0000000000000000000000000000000000000000);
        cancelled = true;
        captain.transfer(boatPrice * 2);
    }

    function transferRestFunds() public {
        msg.sender.transfer(this.balance);
    }
}
