const Web3 = require('web3');
const readline = require('readline');
const web3 = new Web3(
  new Web3.providers.HttpProvider(
    `https://sepolia.infura.io/v3/d52687367e4e419cad8cb5b35074d509`,
  ),
);
// const web3 = new Web3('http://localhost:7545');
const contractABI = [{
  "inputs": [],
  "stateMutability": "nonpayable",
  "type": "constructor"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": false,
      "internalType": "uint8[5]",
      "name": "winningNumbers",
      "type": "uint8[5]"
    },
    {
      "indexed": false,
      "internalType": "address",
      "name": "winner",
      "type": "address"
    }
  ],
  "name": "LotteryDrawn",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": true,
      "internalType": "address",
      "name": "buyer",
      "type": "address"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "ticketId",
      "type": "uint256"
    },
    {
      "indexed": false,
      "internalType": "uint8[5]",
      "name": "numbers",
      "type": "uint8[5]"
    }
  ],
  "name": "TicketPurchased",
  "type": "event"
},
{
  "inputs": [],
  "name": "MAX_TICKETS_PER_USER",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "stateMutability": "view",
  "type": "function",
  "constant": true
},
{
  "inputs": [],
  "name": "manager",
  "outputs": [
    {
      "internalType": "address",
      "name": "",
      "type": "address"
    }
  ],
  "stateMutability": "view",
  "type": "function",
  "constant": true
},
{
  "inputs": [],
  "name": "prizePool",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "stateMutability": "view",
  "type": "function",
  "constant": true
},
{
  "inputs": [],
  "name": "ticketPrice",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "stateMutability": "view",
  "type": "function",
  "constant": true
},
{
  "inputs": [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "name": "tickets",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "id",
      "type": "uint256"
    },
    {
      "internalType": "address",
      "name": "owner",
      "type": "address"
    }
  ],
  "stateMutability": "view",
  "type": "function",
  "constant": true
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "",
      "type": "address"
    }
  ],
  "name": "userTicketCount",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "stateMutability": "view",
  "type": "function",
  "constant": true
},
{
  "inputs": [],
  "name": "addFundsToPrizePool",
  "outputs": [],
  "stateMutability": "payable",
  "type": "function",
  "payable": true
},
{
  "inputs": [
    {
      "internalType": "uint8[5]",
      "name": "numbers",
      "type": "uint8[5]"
    }
  ],
  "name": "buyTicket",
  "outputs": [],
  "stateMutability": "payable",
  "type": "function",
  "payable": true
},
{
  "inputs": [],
  "name": "drawLottery",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}];

const contractAddress = '0xC86a865E5BD2D15892e2d804b152b7e49953Ce3D';

const lottery = new web3.eth.Contract(contractABI, contractAddress);
const userAccount = '0x5C007F30bde2Bf7049c24d90e2d8331a225291B7'; // Replace with the actual user account

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const userMenu = () => {
  rl.question('User Menu:\n1. Buy Ticket\n2. Check Balance\nChoose an option: ', (option) => {
    switch (option) {
      case '1':
        buyTickets();
        break;
      case '2':
        checkBalance();
        break;
      default:
        console.log('Invalid option selected.');
        rl.close();
        break;
    }
  });
};

const buyTickets = () => {
  rl.question('Enter 5 two-digit numbers for your ticket, separated by space (e.g., 12 34 56 78 90): ', async (input) => {
      const numbers = input.split(' ').map(Number);
      const isValidInput = numbers.length === 5 && numbers.every(num => Number.isInteger(num) && num >= 10 && num <= 99);

      if (!isValidInput) {
          console.log('Invalid input. Please enter 5 two-digit numbers separated by space.');
          rl.close();
          return;
      }

      try {
          const ticketPrice = web3.utils.toWei('0.01', 'ether'); // Assuming ticketPrice is 0.01 ETH
          const gas = await lottery.methods.buyTicket(numbers).estimateGas({ from: userAccount, value: ticketPrice });
          const result = await lottery.methods.buyTicket(numbers).send({ from: userAccount, value: ticketPrice, gas });
          console.log('Ticket purchased:', result);
      } catch (error) {
          console.error('Could not purchase a ticket:', error.message);
      }
      rl.close();
  });
};


const checkBalance = async () => {
  const balance = await web3.eth.getBalance(userAccount);
  console.log(`Your balance is: ${web3.utils.fromWei(balance, 'ether')} ETH`);
  rl.close();
};

userMenu();
