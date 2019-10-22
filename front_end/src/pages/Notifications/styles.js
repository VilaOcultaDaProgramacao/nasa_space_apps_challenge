import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 1220px;
  text-align: center;
  align-content: center;
  margin: 80px auto;
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 30px;
    color: #666666;
    margin: 20px 0;
    text-align: left;
  }
`;

export const Chanel = styled.div`
  background: #ececec;
  color: #666666;
  font-size: 30px;
  text-align: left;
  width: 100%;
  padding: 15px 20px;
  margin: 10px auto;
  text-transform: capitalize;
  border-radius: 4px;
`;

export const AddChanel = styled.div`
  background: #2f3030;
  color: white;
  font-weight: bold;
  font-size: 30px;
  text-align: left;
  width: 100%;

  margin: 10px auto;
  border-radius: 4px;
  overflow: hidden;
  display: flex;

  strong {
    flex: 0.95;
    margin: auto;
    padding-left: 20px;
  }

  button {
    background: #ff8345;
    padding: 4px;
    margin: 10px 10px 10px;
    border: none;
    flex: 0.06;
    height: 100%;
    border-radius: 4px;
  }
`;
