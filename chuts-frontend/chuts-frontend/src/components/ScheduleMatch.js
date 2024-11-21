import React, { useState } from "react";
import axios from "axios";
import { ScheduleWrapper } from "../../../src/styles/ScheduleWrapper";

function ScheduleMatch() {
	const [location, setLocation] = useState("");
	const [date, setDate] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const token = localStorage.getItem("token");
			await axios.post(
				"http://localhost:5000/api/matches/create",
				{ location, date },
				{ headers: { Authorization: `Bearer ${token}` } },
			);
			alert("Match scheduled successfully");
		} catch (error) {
			alert("Error scheduling match");
		}
	};

	return (
		<ScheduleWrapper>
			<input
				type="text"
				value={location}
				onChange={(e) => setLocation(e.target.value)}
				placeholder="Location"
			/>
			<input
				type="date"
				value={date}
				onChange={(e) => setDate(e.target.value)}
			/>
			<button type="button" onClick={handleSubmit}>
				Schedule Match
			</button>
		</ScheduleWrapper>
	);
}

export default ScheduleMatch;
