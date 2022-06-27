pragma solidity ^0.4.17;
 
// Factory in order to create mulitple instances of Trip contract without
// manully constructing a template every time for the captain

contract TripFactory {
    address[] public deployedTrips;

    function createTrip(uint minimumPrice, uint seats) public {
        address newTrip = new Trip(minimumPrice, seats, msg.sender);
        deployedTrips.push(newTrip);
    }

    function getTrips() public view returns (address[]) {
        return deployedTrips;
    }
}


contract Trip {
 
    address public captain;
    uint public minimumPrice;
    uint public seats;
    address[] public clientAddresses;
    uint public numberOfClients = 0;
    uint public seatCounter = 0;
 
//client information
    struct Client {
        string name;
        uint number;
        uint seatsBooked;
    }

    mapping (address => Client) clientStruct;
    mapping (address => bool) isClient;
 
    modifier restricted() {
        require(msg.sender == captain);
        _;
    }

    modifier onlyClient() {
        require(isClient[msg.sender] == true);
        _;
    }
 
    function Trip(uint price, uint noOfSeats, address creator) public {
        captain = creator;
        seats = noOfSeats; 
        minimumPrice = price/seats;      
    }
 
    function reserve(string name, uint number, uint reserveSeats) public payable {
        require(msg.value >= minimumPrice * reserveSeats);
        require(numberOfClients + reserveSeats <= seats);
        assignSeats(reserveSeats);

        Client memory newClient = Client({
            name: name,
            number: number,
            seatsBooked: reserveSeats
        });
        
        clientStruct[msg.sender] = newClient;
        isClient[msg.sender] = true;
        numberOfClients++;
    }

    function assignSeats(uint _reserveSeats) private {
        for(uint i = 0; i < _reserveSeats; i ++){
            clientAddresses.push(msg.sender);
            seatCounter++;
        }
 
    }

    uint public typeVote;
    bool public readyToVote = false;
    uint public yesCount = 0;
    uint public noCount = 0;
    bool public refundStatus = false;
    uint public funds;

    mapping(address => bool) clientVoted;

    function startVote() public {
        readyToVote = true;
        //captain use to confirm client - "Does the client approve this payment"
        if(msg.sender == captain){
            typeVote = 0;  
        //client use to confirm captain - "Is captain here?"
        } else {
            typeVote = 1;
        }
        
    }

    function approve() public onlyClient {
        require(readyToVote == true && clientVoted[msg.sender] == false);
        yesCount++;
        clientVoted[msg.sender] = true;
    }

    function deny() public onlyClient {
        require(readyToVote == true && clientVoted[msg.sender] == false);
        noCount++;
        clientVoted[msg.sender] = true;
    }

    function closeVote() public {
        require(readyToVote == true);
        require(yesCount + noCount > clientAddresses.length/2);
        if(typeVote == 0) {    
            if(yesCount > clientAddresses.length/2){
                recievePayment();
            } else {
                funds = this.balance/clientAddresses.length;
                refundStatus = true;   
            }
        } else if(typeVote == 1) {
            if(noCount > clientAddresses.length/2){
                funds = this.balance/clientAddresses.length;
                refundStatus = true; 
            } else {
                recievePayment();
            }   
        }
        readyToVote = false;
    }

    function recievePayment() private {
        captain.transfer(this.balance);
    }

    function refund() public onlyClient{
        require(refundStatus == true);
        msg.sender.transfer(funds * clientStruct[msg.sender].seatsBooked);
        
    }
}