if (typeof window.ethereum !== 'undefined') {
    // MetaMask is installed
    console.log("it's installed")
} else {
    // MetaMask is not installed
    console.log("not installed")
}
if (typeof window.ethereum !== 'undefined') {
    const web3 = new Web3(Web3.givenProvider);
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
    const contractAddress = 'YOUR_CONTRACT_ADDRESS'; // Replace with your contract's address
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    const managerAccount = 'MANAGER_ACCOUNT'; // Replace with the manager's account address

    async function checkBalance() {
        try {
            const balance = await web3.eth.getBalance(managerAccount);
            document.getElementById('balanceDisplay').innerText = 
                `Balance: ${web3.utils.fromWei(balance, 'ether')} ETH`;
        } catch (error) {
            console.error("Failed to retrieve the manager's balance:", error);
        }
    }

    async function drawLottery() {
        try {
            const gasEstimate = await contract.methods.drawLottery().estimateGas({ from: managerAccount });
            const result = await contract.methods.drawLottery().send({ from: managerAccount, gas: gasEstimate });
            // Assuming the event LotteryDrawn returns the winning numbers and winner
            const winningNumbers = result.events.LotteryDrawn.returnValues.winningNumbers;
            document.getElementById('lotteryOutput').innerText = `Winning Numbers: ${winningNumbers}`;
        } catch (error) {
            console.error("Failed to draw the lottery:", error);
        }
    }

    async function addFunds() {
        const amount = document.getElementById('fundAmount').value;
        try {
            const amountInWei = web3.utils.toWei(amount, 'ether');
            const gasEstimate = await contract.methods.addFundsToPrizePool().estimateGas({ from: managerAccount, value: amountInWei });
            await contract.methods.addFundsToPrizePool().send({ from: managerAccount, value: amountInWei, gas: gasEstimate });
            document.getElementById('output').innerText = `Successfully added ${amount} ETH to the prize pool.`;
        } catch (error) {
            console.error("Failed to add funds to the prize pool:", error);
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        if (window.ethereum) {
            window.ethereum.enable().catch(console.error);
        }
    });
} else {
    // MetaMask is not installed
}
