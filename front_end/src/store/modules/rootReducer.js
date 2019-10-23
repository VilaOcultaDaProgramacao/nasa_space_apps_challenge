import { combineReducers } from "redux";

import auth from "./auth/reducer";
import user from "./user/reducer";
import spot from "./Spot/reducer";

export default combineReducers({ auth, user, spot });
