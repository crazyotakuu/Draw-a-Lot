const Web3 = require('web3');
const readline = require('readline');
const web3 = new Web3(
  new Web3.providers.HttpProvider(
    `https://sepolia.infura.io/v3/d52687367e4e419cad8cb5b35074d509`,
  ),
);
// consts web3 = new Web3('http://localhost:7545'); // Your Ganache RPC URL

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
}]; // Replace with your contract's ABI

const contractAddress = '0xC86a865E5BD2D15892e2d804b152b7e49953Ce3D'; // Replace with your contract's address
const managerAccount = "0x921cB5c79a4ACCac8aF836E8Fcf7B4439635A2aD"; // Replace with the actual manager account

const lottery = new web3.eth.Contract(contractABI, contractAddress);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const managerMenu = () => {
    rl.question('Manager Menu:\n1. Check My Balance\n2. Draw Lottery\n3. Add Funds to Prize Pool\nChoose an option: ', (option) => {
        switch (option) {
            case '1':
                checkManagerBalance();
                break;
            case '2':
                drawLottery();
                break;
            case '3':
                addFunds();
                break;
            default:
                console.log('Invalid option selected.');
                rl.close();
                break;
        }
    });
};

const checkManagerBalance = async () => {
    try {
        const balance = await web3.eth.getBalance(managerAccount);
        console.log(`The manager's balance is: ${web3.utils.fromWei(balance, 'ether')} ETH`);
    } catch (error) {
        console.error('Failed to retrieve the manager\'s balance:', error.message);
    }
    rl.close();
};

const drawLottery = async () => {
    try {
        const gas = await lottery.methods.drawLottery().estimateGas({ from: managerAccount });
        const result = await lottery.methods.drawLottery().send({ from: managerAccount, gas });
        console.log('Lottery drawn. Winning numbers:', result.events.LotteryDrawn.returnValues.winningNumbers);
    } catch (error) {
        console.error('Could not draw the lottery:', error.message);
    }
    rl.close();
};

const addFunds = () => {
    rl.question('Enter the amount of ETH to add to the prize pool: ', async (amount) => {
        const amountInWei = web3.utils.toWei(amount, 'ether');
        try {
            await lottery.methods.addFundsToPrizePool().send({
                from: managerAccount,
                value: amountInWei,
                gas: 1000000
            });
            console.log(`Successfully added ${amount} ETH to the prize pool.`);
        } catch (error) {
            console.error('Failed to add funds to the prize pool:', error.message);
        }
        rl.close();
    });
};

managerMenu();
