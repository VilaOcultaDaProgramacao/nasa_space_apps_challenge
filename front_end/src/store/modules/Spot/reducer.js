import { produce } from "immer";

const INITIAL_STATE = {
  spots: []
};

export default function spot(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "@spot/GET_SPOTS_SUCCESS":
      return produce(state, draft => {
        draft.spots = action.payload.spots;
      });
    case "@spot/ADD_SPOT_SUCCESS":
      console.log(action);
      return produce(state, draft => {
        draft.spots = [...draft.spots, action.payload.spot];
      });

    case "@spot/EXCLUE_SPOT_SUCCESS":
      console.log(action);
      return produce(state, draft => {
        draft.spots.splice(action.payload.index, 1);
      });

    default:
      return state;
  }
}
