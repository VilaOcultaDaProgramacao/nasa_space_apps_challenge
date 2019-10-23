import styled from "styled-components";

export const Container = styled.div`
  background: #30b7a5;
  padding: 0 30px;
  justify-content: center;
`;

export const Content = styled.div`
  @import url("https://fonts.googleapis.com/css?family=Roboto:500&display=swap");

  font-family: Roboto;
  height: 80px;
  max-width: 1220px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    height: 55px;
    width: 45px;
    margin-right: 15px;
  }

  a {
    margin: 0 10px;
    color: white;
    font-size: 25px;
  }

  nav {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: column;
  color: white;

  strong {
    font-size: 20px;
    font-weight: normal;
  }

  button {
    margin: 10px auto;
    background: none;
    color: white;
    border: none;
    font-size: 16px;
  }
`;
