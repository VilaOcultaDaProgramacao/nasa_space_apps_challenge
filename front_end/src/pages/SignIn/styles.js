import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  width: 100%;
  max-width: 990px;
  align-self: center;
  margin: 0 auto;
  align-items: center;
  align-content: center;
`;

export const Form = styled.form`
  align-self: center;
  width: fit-content;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  input {
    padding: 15px 15px;
    border: none;

    margin: 5px auto;
    border-radius: 4px;
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
