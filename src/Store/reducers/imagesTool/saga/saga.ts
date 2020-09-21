import { put } from "redux-saga/effects";
import { fetchImagesSuccess } from "../actions";

export function* fetchImages() {
  const response: string = yield localStorage.getItem("imagesItems") as string;
  yield put(fetchImagesSuccess(JSON.parse(response)));
}
