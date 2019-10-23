import { all, takeLatest, put, call } from "redux-saga/effects";

import api from "../../../services/api";
import history from "../../../services/history";

import {
  getSpotFailure,
  getSpotSuccess,
  addSpotSuccess,
  exclueSpotSuccess
} from "./actions";

export function* addSpot({ payload }) {
  try {
    const { token, name, lat, log } = payload.info;

    const response = yield call(api.post, "ajax/insertspot.php", {
      token,
      spot_name: name,
      spot_lat: lat,
      spot_long: log
    });

    const spot = {
      spot_name: name,
      spot_lat: lat,
      spot_long: log
    };

    yield put(addSpotSuccess(spot));
  } catch {}
}

export function* getSpots({ payload }) {
  try {
    const { token } = payload;

    const response = yield call(
      api.get,
      `ajax/getspots.php?token=${token}`,
      {}
    );

    const sites = response.data;

    yield put(getSpotSuccess(sites));
  } catch {
    yield put(getSpotFailure());
  }
}

export function* exclueSpot({ payload }) {
  const { spot, index, token } = payload;

  const spot_id = spot.spot_id;

  const response = yield call(api.post, "ajax/deletespot.php", {
    token,
    spot_id
  });

  yield put(exclueSpotSuccess(index));
  history.push("/");
}

export default all([
  takeLatest("@spot/EXCLUE_SPOT", exclueSpot),
  takeLatest("@spot/ADD_SPOT", addSpot),
  takeLatest("@spot/GET_SPOTS", getSpots)
]);
