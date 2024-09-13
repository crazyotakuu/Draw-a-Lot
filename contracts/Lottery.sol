// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Lottery {
    address public manager;
    uint256 public ticketPrice = 0.01 ether;
    uint256 public constant MAX_TICKETS_PER_USER = 5;
    uint256 public prizePool;
    struct Ticket {
        uint256 id;
        address owner;
        uint8[5] numbers;
    }

    Ticket[] public tickets;
    mapping(address => uint256) public userTicketCount;

    event TicketPurchased(address indexed buyer, uint256 ticketId, uint8[5] numbers);
    event LotteryDrawn(uint8[5] winningNumbers, address winner);

    constructor() {
        manager = msg.sender;
        prizePool = 0;
    }

    function addFundsToPrizePool() public payable onlyManager {
        require(msg.value > 0, "Must send ETH to add to the prize pool");
        prizePool += msg.value;
    }

    modifier onlyManager() {
        require(msg.sender == manager, "Only manager can call this function.");
        _;
    }

    function buyTicket(uint8[5] memory numbers) public payable {
        require(msg.value == ticketPrice, "Incorrect amount of ETH sent.");
        require(userTicketCount[msg.sender] < MAX_TICKETS_PER_USER, "Exceeded max tickets per user.");

        uint256 ticketId = tickets.length;
        tickets.push(Ticket(ticketId, msg.sender, numbers));
        userTicketCount[msg.sender]++;

        emit TicketPurchased(msg.sender, ticketId, numbers);
    }


    function drawLottery() public onlyManager {
        require(tickets.length > 0, "No tickets purchased.");

        uint8[5] memory winningNumbers = generateRandomNumbers();
        address winner = checkForWinner(winningNumbers);
        
        if (winner != address(0)) {
            uint256 prizeAmount = address(this).balance;
            payable(winner).transfer(prizeAmount);
            prizePool = 0;
        } else {
            uint256 sales = address(this).balance - prizePool;
            uint256 managerShare = (sales * 40) / 100;
            payable(manager).transfer(managerShare);
        }

        delete tickets;
        emit LotteryDrawn(winningNumbers, winner);
    }

    function generateRandomNumbers() private view returns (uint8[5] memory) {
        uint8[5] memory randomNumbers;
        for (uint8 i = 0; i < 5; i++) {
            randomNumbers[i] = uint8(uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty, i))) % 100);
        }
        return randomNumbers;
    }

    function checkForWinner(uint8[5] memory winningNumbers) private view returns (address) {
        for (uint256 i = 0; i < tickets.length; i++) {
            if (compareNumbers(tickets[i].numbers, winningNumbers)) {
                return tickets[i].owner;
            }
        }
        return address(0);
    }

    function compareNumbers(uint8[5] memory a, uint8[5] memory b) private pure returns (bool) {
        for (uint8 i = 0; i < 5; i++) {
            if (a[i] != b[i]) {
                return false;
            }
        }
        return true;
    }
}
