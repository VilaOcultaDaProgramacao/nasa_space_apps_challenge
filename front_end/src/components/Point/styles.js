import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  margin-bottom: 30px;

  button {
    padding: 10px 15px;
    background: #fa4c08;
    border: none;
    border-radius: 4px;
    margin-left: auto;
  }
`;

export const Location = styled.div`
  border-radius: 4px;
  background: #ececec;
  display: flex;
  flex: 0.98;
  justify-content: center;

  strong {
    flex: 0.95;
    margin: auto;
    padding-left: 20px;
    font-size: 30px;
    font-weight: normal;
  }
`;
