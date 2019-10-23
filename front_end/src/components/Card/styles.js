import styled from "styled-components";

export const Container = styled.div`
  background: #fa4c08;
  margin-right: 10px;
  padding: 15px;
  max-width: 230px;
  border-radius: 4px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  strong {
    text-align: center;
    margin: 10px auto;
    font-size: 25px;
    color: white;
  }

  div {
    margin-top: 50px;
    margin-bottom: 0px
    display: flex;
    flex-direction: column;
  }
`;
