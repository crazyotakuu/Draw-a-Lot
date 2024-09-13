import React, { useState } from "react";
import { lottery_abi } from "./abi/abi";
import Web3 from "web3";
import "./App.css";

const web3 = new Web3(Web3.givenProvider);
const contractAddress = "0x7cd46b9106EF07e8A3C4DB8Caf06b0acc1Ff4cd0";
const lotteryContract = new web3.eth.Contract(lottery_abi, contractAddress);

function App() {
  const [addFundsAmount, setAddFundsAmount] = useState('');
  const [winningNumbers, setWinningNumbers] = useState([]);
  const [message, setMessage] = useState('');

  const drawLottery = async () => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const transaction = await lotteryContract.methods.drawLottery().send({ from: accounts[0] });
  
      // Assuming 'LotteryDrawn' event returns the winning numbers
      const event = transaction.events.LotteryDrawn;
      if (event) {
        const winningNums = event.returnValues.winningNumbers;
        setWinningNumbers(winningNums);
        setMessage(`Lottery drawn. Winning numbers: ${winningNums.join(", ")}`);
      } else {
        setMessage('Lottery drawn, but no winning numbers returned.');
      }
    } catch (error) {
      console.error("Error drawing the lottery:", error);
      setMessage('Error drawing the lottery.');
    }
  };
  

  const addFunds = async (event) => {
    event.preventDefault();
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const amountInWei = web3.utils.toWei(addFundsAmount, 'ether');
      await lotteryContract.methods.addFundsToPrizePool().send({ from: accounts[0], value: amountInWei });
      setMessage(`Successfully added ${addFundsAmount} ETH to the prize pool.`);
      setAddFundsAmount('');
    } catch (error) {
      console.error("Error adding funds:", error);
      setMessage('Error adding funds.');
    }
  };

  return (
    <div className="main">
      <div className="card">
        <h2>Lottery Manager</h2>
        <button onClick={drawLottery} className="button">
          Draw Lottery
        </button>
        {winningNumbers.length > 0 && (
          <div className="winning-numbers">
            <h3>Winning Numbers:</h3>
            <p>{winningNumbers.join(", ")}</p>
          </div>
        )}
        <div className="form">
          <form onSubmit={addFunds}>
            <input
              type="text"
              value={addFundsAmount}
              className="input"
              onChange={(e) => setAddFundsAmount(e.target.value)}
              placeholder="Amount in ETH"
            />
            <button type="submit" className="button">Add Funds to Prize Pool</button>
          </form>
        </div>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
  
}

export default App;
