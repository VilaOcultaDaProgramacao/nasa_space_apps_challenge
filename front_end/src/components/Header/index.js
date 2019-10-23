import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import logo from "../../assets/Logo.png";

import { Container, Content, Profile } from "./styles";

import { signOut } from "../../store/modules/auth/actions";

export default function Header() {
  const dispatch = useDispatch();
  const name = useSelector(state => state.user.profile.name);

  function handleOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="logo" />
          <Link to="/perfil">PROFILE</Link>
          <Link to="/dashboard">SPOTS</Link>
          <Link to="/notifications">NOTIFICATIONS</Link>
        </nav>

        <aside>
          <Profile>
            <strong>{name}</strong>
            <button type="button" onClick={() => handleOut()}>
              LOG OUT
            </button>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
