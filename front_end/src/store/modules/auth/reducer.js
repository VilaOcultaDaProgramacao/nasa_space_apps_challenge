import produce from "immer";

const INITIAL_STATE = {
  token: "",
  signed: false,
  loading: false,
  error: false
};

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "@auth/SIGN_IN_SUCCESS":
      console.log(action);
      return produce(state, draft => {
        draft.token = action.payload.token;
        draft.signed = true;
        draft.error = false;
      });
    case "@auth/SIGN_FAILURE":
      console.log(action);
      return produce(state, draft => {
        draft.error = true;
      });
    case "@auth/SIGN_OUT":
      console.log(action);
      return produce(state, draft => {
        draft.token = null;
        draft.signed = false;
      });
    default:
      return state;
  }
}
