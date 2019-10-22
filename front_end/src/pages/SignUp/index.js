import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";

import logo from "../../assets/Logo.png";
import { signUpRequest } from "../../store/modules/auth/actions";

export default function SignUp() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const info = {
      name,
      email,
      pass: password
    };

    dispatch(signUpRequest(info));
  }

  return (
    <>
      <img src={logo} alt="" />

      <form onSubmit={e => handleSubmit(e)}>
        <strong>Nome</strong>
        <input
          name="name"
          required
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Seu Nome Completo"
        />
        <strong>Email</strong>
        <input
          name="email"
          required
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Seu e-mail"
        />
        <strong>Senha</strong>
        <input
          required
          name="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Sua senha secreta"
        />

        <button type="submit">CREATE ACCOUNT</button>
        <Link to="/">Ja tenho conta</Link>
      </form>
    </>
  );
}
