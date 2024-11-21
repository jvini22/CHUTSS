import styled from "styled-components";

export const PostCard = styled.li`
  background: #fff;
  padding: 15px;
  border-radius: 10px;
  margin: 10px 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  }
`;
