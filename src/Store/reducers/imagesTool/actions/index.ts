import { createAction } from "redux-act";

export const fetchImagesStart = createAction("FETCH_IMAGES_START");
export const fetchImagesSuccess = createAction(
  "FETCH_IMAGES_SUCCESS",
  (data) => ({ data })
);
export const fetchImagesError = createAction("FETCH_IMAGES_ERROR");
