import React, { useState } from "react";
import axios from "axios";
import { BetWrapper } from "../../../src/styles/BetWrapper";

function Bet() {
	const [matchId, setMatchId] = useState("");
	const [xpAmount, setXpAmount] = useState("");

	const handleBet = async () => {
		try {
			const token = localStorage.getItem("token");
			await axios.post(
				"http://localhost:5000/api/betting/place",
				{ matchId, xpAmount },
				{ headers: { Authorization: `Bearer ${token}` } },
			);
			alert("Bet placed successfully");
		} catch (error) {
			alert("Not enough XP or error placing bet");
		}
	};

	return (
		<BetWrapper>
			<input
				type="text"
				value={matchId}
				onChange={(e) => setMatchId(e.target.value)}
				placeholder="Match ID"
			/>
			<input
				type="number"
				value={xpAmount}
				onChange={(e) => setXpAmount(e.target.value)}
				placeholder="XP Amount"
			/>
			<button type="button" onClick={handleBet}>
				Fazer Bet
			</button>
		</BetWrapper>
	);
}

export default Bet;
