const Web3 = require('web3');
const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

const contractABI = YOUR_CONTRACT_ABI; // Replace with your contract's ABI
const contractAddress = 'YOUR_CONTRACT_ADDRESS'; // Replace with your contract's address
const contract = new web3.eth.Contract(contractABI, contractAddress);
let userAccount;

async function checkUserBalance() {
    if (!userAccount) {
        userAccount = (await web3.eth.getAccounts())[0];
    }
    try {
        const balance = await web3.eth.getBalance(userAccount);
        document.getElementById('balanceDisplay').innerText = 
            `Your Balance: ${web3.utils.fromWei(balance, 'ether')} ETH`;
    } catch (error) {
        console.error("Failed to retrieve balance:", error);
    }
}

async function buyTicket() {
    const numbers = document.getElementById('ticketNumbers').value.split(',').map(num => parseInt(num.trim()));
    if (numbers.length !== 5) {
        alert('Please enter exactly 5 numbers');
        return;
    }

    if (!userAccount) {
        userAccount = (await web3.eth.getAccounts())[0];
    }

    try {
        const ticketPrice = await contract.methods.ticketPrice().call();
        const gasEstimate = await contract.methods.buyTicket(numbers).estimateGas({ from: userAccount, value: ticketPrice });
        await contract.methods.buyTicket(numbers).send({ from: userAccount, value: ticketPrice, gas: gasEstimate });
        document.getElementById('ticketInfo').innerText = `Ticket Purchased: [${numbers.join(', ')}]`;
    } catch (error) {
        console.error("Failed to buy ticket:", error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (window.ethereum) {
        window.ethereum.enable().catch(console.error);
    }
});
