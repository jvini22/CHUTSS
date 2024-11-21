import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavBar = styled.nav`
  background: #0b875b;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    color: white;
    text-decoration: none;
    margin: 0 15px;
    font-weight: bold;
    transition: color 0.3s;

    &:hover {
      color: #f4f4f9;
    }
  }
`;

function Navbar() {
	return (
		<NavBar>
			<h2 style={{ color: "white" }}>CHUTS</h2>
			<div>
				<Link to="/schedule">Agendar Partida</Link>
				<Link to="/feed">Feed</Link>
				<Link to="/bet">Apostas</Link>
				<Link to="/profile">Perfil</Link>
			</div>
		</NavBar>
	);
}

export default Navbar;
