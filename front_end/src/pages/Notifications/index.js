import React from "react";
import { useSelector } from "react-redux";
import { FaFacebook, FaSms } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import { Container, Chanel, AddChanel } from "./styles";

export default function Notifications() {
  const email = useSelector(state => state.user.profile.email);
  return (
    <Container>
      <h1>Alerts Channels</h1>
      <Chanel>{email}</Chanel>
      <AddChanel>
        <strong>Add new channel</strong>
        <button>
          <FaFacebook color="white" size={50} />
        </button>
        <button>
          <FaSms color="white" size={50} />
        </button>
        <button>
          <MdEmail color="white" size={50} />
        </button>
      </AddChanel>
    </Container>
  );
}
