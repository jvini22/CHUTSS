import React, { useState, useEffect } from "react";
import axios from "axios";
import { ProfileCard } from "../../../src/styles/ProfileCard";

function Profile() {
	const [profile, setProfile] = useState({});

	useEffect(() => {
		async function fetchProfile() {
			try {
				const token = localStorage.getItem("token");
				const response = await axios.get("http://localhost:5000/api/profile", {
					headers: { Authorization: `Bearer ${token}` },
				});
				setProfile(response.data);
			} catch (error) {
				alert("Error fetching profile");
			}
		}
		fetchProfile();
	}, []);

	return (
		<ProfileCard>
			<h2>{profile.name}</h2>
			<p>XP: {profile.xp}</p>
			{/* Exibir outras informações e conquistas */}
		</ProfileCard>
	);
}

export default Profile;
