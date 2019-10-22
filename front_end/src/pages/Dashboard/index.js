import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpots } from "../../store/modules/Spot/actions";

import { Container, Cards, Pins } from "./styles";
import Point from "../../components/Point";
import AddPoint from "../../components/AddPin";

export default function Dashboard() {
  const dispatch = useDispatch();

  const token = useSelector(state => state.auth.token);
  const spots = useSelector(state => state.spot.spots);

  useEffect(() => {
    async function a() {
      dispatch(getSpots(token));
    }

    a();
  }, []);

  return (
    <Container>
      <Pins>
        <h1> My Pins </h1>
        <div>
          {spots &&
            spots.map((spot, index) => (
              <Point key={spot.spot_lat} index={index} spot={spot} />
            ))}

          <AddPoint />
        </div>
      </Pins>
    </Container>
  );
}
