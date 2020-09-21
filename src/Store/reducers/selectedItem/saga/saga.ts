import { put, select, delay } from "redux-saga/effects";
import { NotificationManager } from "react-notifications";
import {
  saveNewImagesSuccess,
  setModalVisibility,
  clearStore,
  saveNewImagesError,
  updateImageObjectSuccess,
} from "../actions";
import * as actionTypes from "../../imagesTool/actions";

const getSelectedItem = (state: ImagesToolStore) => state.selectedItem;

const IDCreate = function () {
  return `_${Math.random().toString(36).substr(2, 9)}`;
};

const localStorageService = (selectedItem: SelectedItemStore, type: string) => {
  const selectedItemCopy = { ...selectedItem };
  selectedItemCopy.loadingStatus = "";
  const oldStoreItems =
    JSON.parse(localStorage.getItem("imagesItems") as string) || {};
  if (type === "add") {
    selectedItemCopy.id = IDCreate();
    oldStoreItems[selectedItemCopy.id] = selectedItemCopy;
  } else if (type === "update") {
    oldStoreItems[selectedItemCopy.id] = selectedItemCopy;
  } else if (type === "delete") {
    delete oldStoreItems[selectedItemCopy.id];
  }
  localStorage.setItem("imagesItems", JSON.stringify(oldStoreItems));
};

export function* saveImage() {
  const selectedItem: SelectedItemStore = yield select(getSelectedItem);

  if (!selectedItem.imageURL) {
    NotificationManager.error("Please add Image", "", 5000);
    yield put(saveNewImagesError());
  } else {
    yield delay(1000);
    localStorageService(selectedItem, "add");
    yield put(saveNewImagesSuccess());
    yield put(setModalVisibility(false));
    yield put(actionTypes.fetchImagesStart());
  }
}

export function* updateImage() {
  const selectedItem: SelectedItemStore = yield select(getSelectedItem);
  yield delay(1000);
  localStorageService(selectedItem, "update");
  yield put(updateImageObjectSuccess());
  yield put(setModalVisibility(false));
  yield put(actionTypes.fetchImagesStart());
}

export function* deleteImage() {
  const selectedItem: SelectedItemStore = yield select(getSelectedItem);
  yield delay(1000);
  localStorageService(selectedItem, "delete");
  yield put(setModalVisibility(false));
  yield put(actionTypes.fetchImagesStart());
}

export function* setModalVisibilityFalse(action: {
  payload: { show: boolean };
}) {
  if (!action.payload.show) {
    yield put(clearStore());
  }
}
