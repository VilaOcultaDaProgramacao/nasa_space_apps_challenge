export function addSpot(info) {
  return {
    type: "@spot/ADD_SPOT",
    payload: { info }
  };
}

export function getSpots(token) {
  return {
    type: "@spot/GET_SPOTS",
    payload: { token }
  };
}

export function getSpotSuccess(spots) {
  return {
    type: "@spot/GET_SPOTS_SUCCESS",
    payload: { spots }
  };
}

export function getSpotFailure() {
  return {
    type: "@spot/GET_SPOTS_FAILURE"
  };
}

export function addSpotSuccess(spot) {
  return {
    type: "@spot/ADD_SPOT_SUCCESS",
    payload: { spot }
  };
}

export function exclueSpot(spot, index, token) {
  return {
    type: "@spot/EXCLUE_SPOT",
    payload: { spot, index, token }
  };
}

export function exclueSpotSuccess(index) {
  return {
    type: "@spot/EXCLUE_SPOT_SUCCESS",
    payload: { index }
  };
}
