import React, { useState, useEffect } from "react";
import axios from "axios";
import { PostCard } from "../../../src/styles/PostCard";

function Feed() {
	const [posts, setPosts] = useState([]);
	const [content, setContent] = useState("");

	useEffect(() => {
		async function fetchPosts() {
			try {
				const response = await axios.get("http://localhost:5000/api/feed");
				setPosts(response.data);
			} catch (error) {
				alert("Error fetching posts");
			}
		}
		fetchPosts();
	}, []);

	const handlePost = async () => {
		try {
			const token = localStorage.getItem("token");
			await axios.post(
				"http://localhost:5000/api/feed/create",
				{ content },
				{ headers: { Authorization: `Bearer ${token}` } },
			);
			setContent("");
			const response = await axios.get("http://localhost:5000/api/feed");
			setPosts(response.data);
		} catch (error) {
			alert("Error creating post");
		}
	};

	return (
		<div>
			<input
				type="text"
				value={content}
				onChange={(e) => setContent(e.target.value)}
				placeholder="Post something..."
			/>
			<button type="button" onClick={handlePost}>
				Postar
			</button>
			<ul>
				{posts.map((post) => (
					<PostCard key={post.id}>{post.content}</PostCard>
				))}
			</ul>
		</div>
	);
}

export default Feed;
