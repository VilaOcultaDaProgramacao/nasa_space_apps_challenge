import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  margin-bottom: 30px;

  button {
    padding: 10px 15px;
    background: #53e3a4;
    border: none;
    border-radius: 4px;
    margin-left: auto;
  }
`;

export const Location = styled.div`
  border-radius: 4px;
  background: #b5b5b5;
  display: flex;
  flex: 0.98;
  justify-content: center;

  strong {
    color: white;
    flex: 0.95;
    margin: auto;
    padding-left: 20px;
    font-size: 30px;
  }
`;

export const Form = styled.form`
  align-self: center;
  width: fit-content;
  margin: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;

  input {
    min-width: 30rem;
    padding: 15px 15px;
    border: none;
    background: #ececec;
    margin: 5px auto;
    border-radius: 4px;
  }

  strong {
    width: 100%;
    text-align: left;
    margin: 10px 0px;
    font-size: 20px;
    color: #666666;
  }

  button {
    width: 100%;
    padding: 15px 0;
    border: none;
    background: #7159c1;
    margin: 15px auto;
    border-radius: 4px;
  }
`;

export const Buttton = styled.button`
  border-radius: 4px;
  background: #fab45a;

  color: white;
  padding: 15px 30px;
  border: none;
  font-size: 20px;
`;

export const SpotButtons = styled.div`
  padding: 30px 45px;
  height: 100%;
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
