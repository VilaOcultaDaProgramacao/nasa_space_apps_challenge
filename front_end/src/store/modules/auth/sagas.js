import { all, takeLatest, put, call } from "redux-saga/effects";

import api from "../../../services/api";
import history from "../../../services/history";

import { signInSuccess, signFailure } from "./actions";

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, "ajax/login", {
      email,
      pass: password
    });

    const { token, uname } = response.data[0];

    const user = { name: uname, email };

    yield put(signInSuccess(token, user));

    history.push("/dashboard");
  } catch {
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  const { info } = payload;
  const { email, pass, name } = info;

  const response = yield call(api.post, "ajax/register", {
    email,
    name,
    pass
  });

  history.push("/");
}

export function signOut() {
  history.push("/");
}

export default all([
  takeLatest("@auth/SIGN_OUT", signOut),
  takeLatest("@auth/SIGN_IN_REQUEST", signIn),
  takeLatest("@auth/SIGN_UP_REQUEST", signUp)
]);
