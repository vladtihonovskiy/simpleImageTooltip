import { takeEvery } from "redux-saga/effects";

import * as actionTypes from "../actions";
import { saveImage, updateImage, setModalVisibilityFalse, deleteImage } from "./saga";

export function* watchSaveUpdateImage() {
  yield takeEvery(actionTypes.saveNewImageStart, saveImage);
  yield takeEvery(actionTypes.updateImageObjectStart, updateImage);
  yield takeEvery(actionTypes.setModalVisibility, setModalVisibilityFalse);
  yield takeEvery(actionTypes.deleteImageStart, deleteImage);
}
