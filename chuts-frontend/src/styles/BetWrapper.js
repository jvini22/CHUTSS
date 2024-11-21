import styled from "styled-components";

export const BetWrapper = styled.div`
  background: #f9f9f9;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  input {
    margin: 5px 0;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 100%;
    max-width: 300px;
    transition: border-color 0.3s;

    &:focus {
      border-color: #0b875b;
      outline: none;
    }
  }

  button {
    background: #0b875b;
    color: white;
    font-weight: bold;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
      background: #086b47;
    }
  }
`;
