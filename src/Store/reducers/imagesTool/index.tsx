import { createReducer } from "redux-act";
import * as actionTypes from "./actions";

const initialState: ImagesTool = {
  data: {},
  usersRequestStatus: "",
};

const reducer = createReducer<typeof initialState>({}, initialState);

reducer.on(actionTypes.fetchImagesStart, (state) => ({
  ...state,
  usersRequestStatus: "pending",
}));
reducer.on(actionTypes.fetchImagesSuccess, (state, payload: any) => ({
  ...state,
  data: payload.data,
  usersRequestStatus: "success",
}));
reducer.on(actionTypes.fetchImagesError, (state) => ({
  ...state,
  usersRequestStatus: "reject",
}));

export default reducer;
