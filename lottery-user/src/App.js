import React, { useState } from "react";
import Web3 from "web3";
import { lottery_abi } from "./abi/abi";
import "./App.css";

const web3 = new Web3(Web3.givenProvider);
const contractAddress = "0x7cd46b9106EF07e8A3C4DB8Caf06b0acc1Ff4cd0";
const lotteryContract = new web3.eth.Contract(lottery_abi, contractAddress);
const ticketPrice = web3.utils.toWei('0.01', 'ether');

function UserComponent() {
  const [numbers, setNumbers] = useState("");
  const [message, setMessage] = useState("");

  const buyTicket = async (event) => {
    event.preventDefault();
    const parsedNumbers = numbers.split(" ").map(num => parseInt(num.trim()));
    if (parsedNumbers.length !== 5 || parsedNumbers.some(isNaN)) {
      alert("Please enter exactly 5 valid two-digit numbers, separated by commas.");
      return;
    }

    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      await lotteryContract.methods.buyTicket(parsedNumbers).send({ from: accounts[0], value: ticketPrice });
      setMessage("Ticket purchased successfully.");
      setNumbers("");
    } catch (error) {
      console.error("Error purchasing ticket:", error);
      setMessage("Error purchasing ticket.");
    }
  };

  return (
    <div className="main">
      <div className="card">
        <h2>Buy Lottery Ticket</h2>
        <form onSubmit={buyTicket} className="form">
          <input
            type="text"
            value={numbers}
            onChange={(e) => setNumbers(e.target.value)}
            placeholder="Enter 5 numbers (e.g., 10 20 30 40 50)"
            className="input"
          />
          <button type="submit" className="button">Buy Ticket</button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

export default UserComponent;
