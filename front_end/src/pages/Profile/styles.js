import styled from "styled-components";
import { darken } from "polished";

export const Container = styled.div`
  width: 100%;
  max-width: 800px;
  text-align: center;
  align-content: center;
  margin: 0 auto;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 80px;

    input {
      background: #ececec;
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 30px 25px
      color: black;
      margin: 0 0 10px;
      font-size: 30px;
    }

    strong {
      font-size: 30px;
      text-align: left;
      margin-bottom: 5px;
      padding-left: 10px;
      color: #666666;
    }

    button {
      font-size: 30px !important;
      height: 44px;
      background: #FAB45A;
      color: white;
      font-weight: bold;
      border: 0;
      margin-top: 15px;
      padding: 0 25px
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;
      max-width: fit-content;
      align-self: flex-end;

      &:hover {
        background: ${darken(0.03, "#FAB45A")};
      }
    }

    a {
      margin-top: 15px;
      font-size: 16px;
      opacity: 0.8;
    }
  }
`;
