import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdClose } from "react-icons/md";

import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";

import { Container, Location } from "./styles";

import { exclueSpot } from "../../store/modules/Spot/actions";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Point({ spot, index }) {
  const dispatch = useDispatch();

  const token = useSelector(state => state.auth.token);

  function handleExclue() {
    dispatch(exclueSpot(spot, index, token));
  }

  return (
    <Container>
      <Location>
        <strong>{spot.spot_name}</strong>
      </Location>
      <button onClick={() => handleExclue()}>
        <MdClose size={40} color="white" />
      </button>
    </Container>
  );
}
