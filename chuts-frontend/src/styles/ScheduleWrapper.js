import styled from "styled-components";

export const ScheduleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  input, button {
    margin: 10px 0;
    padding: 10px;
    width: 100%;
    max-width: 400px;
    border: 1px solid #ddd;
    border-radius: 4px;
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
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
      background: #086b47;
    }
  }
`;
