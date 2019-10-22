import styled from "styled-components";
import { darken } from "polished";

export const Wrapper = styled.div`
  height: 100%;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 315px;
  text-align: center;

  img {
    height: 110px;
    widht: 80px;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    strong {
      text-align: left;
      margin-bottom: 10px;
    }

    input {
      background: #ececec;
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: black;
      margin-bottom: 20px;
    }

    button {
      margin: 5px 0 0;
      height: 44px;
      background: #30b7a5;
      font-weight: bold;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;
      color: white;

      &:hover {
        background: ${darken(0.03, "#30B7A5")};
      }
    }

    a {
      margin-top: 15px;
      font-size: 16px;
      opacity: 0.8;
    }

    div {
      display: flex;
    }
  }
`;
