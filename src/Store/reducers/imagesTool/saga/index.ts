import { takeEvery } from "redux-saga/effects";

import * as actionTypes from "../actions";
import { fetchImages } from "./saga";

export function* watchImages() {
  yield takeEvery(actionTypes.fetchImagesStart, fetchImages);
}
