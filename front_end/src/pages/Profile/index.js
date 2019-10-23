import React, { useState } from "react";

import { useSelector } from "react-redux";
import { Container } from "./styles";

export default function Profile() {
  const placeholderName = useSelector(state => state.user.profile.name);
  const placeholderEmail = useSelector(state => state.user.profile.email);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Container>
      <form>
        <strong>Name</strong>
        <input
          name="name"
          required
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder={placeholderName}
        />
        <strong>Email</strong>
        <input
          name="email"
          required
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder={placeholderEmail}
        />
        <strong>Password</strong>
        <input
          required
          name="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Sua senha secreta"
        />
        <button type="submit">Salvar</button>
      </form>
    </Container>
  );
}
