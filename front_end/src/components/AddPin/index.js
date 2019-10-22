import React, { useState } from "react";

import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";

import { useDispatch, useSelector } from "react-redux";

import { MdAdd } from "react-icons/md";
import { Container, Location, Form, Buttton, SpotButtons } from "./styles";

import { addSpot } from "../../store/modules/Spot/actions";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddPin() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [lat, setLat] = useState("");
  const [name, setName] = useState("");
  const [log, setLog] = useState("");
  const token = useSelector(state => state.auth.token);

  function handleAdd() {
    dispatch(addSpot({ name, lat, log, token }));

    setOpen(false);
  }

  return (
    <>
      <Container>
        <Location>
          <strong>Add new pin </strong>
        </Location>
        <button type="button" onClick={() => setOpen(true)}>
          <MdAdd size={40} color="white" />
        </button>
      </Container>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <Form>
          <strong>Spot Name</strong>
          <input
            name="name"
            required
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Spot Name"
          />
          <strong>Longitude</strong>
          <input
            name="log"
            required
            type="text"
            value={log}
            onChange={e => setLog(e.target.value)}
            placeholder="Longitude"
          />
          <strong>Latitude</strong>
          <input
            name="lat"
            required
            type="text"
            value={lat}
            onChange={e => setLat(e.target.value)}
            placeholder="Latitude"
          />
        </Form>

        <SpotButtons>
          <Buttton color="primary" onClick={() => setOpen(false)}>
            Cancel
          </Buttton>
          <Buttton color="primary" onClick={handleAdd}>
            Save Spot
          </Buttton>
        </SpotButtons>
      </Dialog>
    </>
  );
}
