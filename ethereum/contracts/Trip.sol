pragma solidity ^0.4.17;

contract TripFactory {
    address[] public deployedTrips;
    address public contractOwner = 0x123D31F1Dd7d514Eed3e15E84C078DCEdab368cA;


    function createTrip(address captain) public {
        require(msg.sender == contractOwner);
        address newTrip = new Trip(captain);
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
    string public date;
    uint256 public boatPrice;
    uint256 public totalBalance;
    uint256 public deposit;
    bool public reserved;
    bool public refunded;
    bool public confirmed;
    address private owner = 0x123D31F1Dd7d514Eed3e15E84C078DCEdab368cA;   
    

    modifier restricted() {
        require(msg.sender == captain);
        _;
    }

    modifier onlyClient() {
        require(msg.sender == client);
        _;
    }

    function Trip(address _captain) public {
        captain = _captain;
    }

    function reserve() public payable {
        require(msg.sender != captain);
        require(msg.value == deposit);
        require(reserved == false);

        reserved = true;
        totalBalance += msg.value;
        client = msg.sender;
    }

    function setDescription(string _description, uint price) public restricted {
        require(reserved == false);
        description = _description;
        boatPrice = price;
        deposit = boatPrice * 2;
    }

    function captainConfirmation(string _date) public restricted payable {
        require(msg.value == deposit);
        require(reserved == true);
        require(confirmed == false);
        confirmed = true;
        date = _date;
        totalBalance += msg.value;
    }

    function captainCancel() public restricted {
        require(reserved == true);
        require(confirmed == false);
        client.transfer(totalBalance);
        resetContract();
    }

    function approveTrip() public onlyClient {
        require(confirmed == true);
        require(refunded == false);
        uint fees = (boatPrice/10);
        captain.transfer(deposit + boatPrice - fees);
        client.transfer(deposit - boatPrice);
        owner.transfer(fees);
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
        date = "";
        description = "";
        boatPrice = 0;
        deposit = 0;
    }

    function getSummary() public view returns (uint256, uint256, address, uint256, bool, bool, bool, string, address, string) {
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