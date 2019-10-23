import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

import logo from "../../assets/Logo.png";

import { signInRequest } from "../../store/modules/auth/actions";
import api from "../../services/api";

export default function SignIn() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const error = useSelector(state => state.auth.error);

  async function handleSubmit(e) {
    e.preventDefault();

    dispatch(signInRequest({ password, email }));
  }

  return (
    <>
      <img src={logo} alt="" />

      <form onSubmit={e => handleSubmit(e)}>
        <strong>Nome</strong>
        <input
          name="email"
          required
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Seu e-mail"
        />
        <strong>Email</strong>
        <input
          required
          name="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Sua senha secreta"
        />

        <button type="submit">LOGIN</button>
        <Link to="/register">Criar conta gratuita</Link>
      </form>
      {error ? <h1>dados invalidos</h1> : null}
    </>
  );
}
