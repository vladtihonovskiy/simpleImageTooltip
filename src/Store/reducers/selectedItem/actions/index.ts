import { createAction } from "redux-act";

export const updateText = createAction("UPDATE_TEXT", (text: string) => ({
  text,
}));
export const updateTextColor = createAction(
  "UPDATE_TEXT_COLOR",
  (color: string) => ({
    color,
  })
);
export const updateTooltipColor = createAction(
  "UPDATE_TOOLTIP_COLOR",
  (color: string) => ({ color })
);
export const setToolTipVisibility = createAction(
  "SET_TOOLTIP_VISIBILITY",
  (show: boolean) => ({ show })
);

export const updateToolTipPosition = createAction(
  "UPDATE_TOOLTIP_POSITION",
  (position) => ({ position })
);

export const updateImage = createAction("UPDATE_IMAGE", (url: string) => ({
  url,
}));

export const updateImageObjectStart = createAction("UPDATE_IMAGE_OBJECT_START");
export const updateImageObjectSuccess = createAction(
  "UPDATE_IMAGE_OBJECT_SUCCESS"
);

export const saveNewImageStart = createAction("SAVE_NEW_IMAGE_START");

export const saveNewImagesSuccess = createAction("SAVE_NEW_IMAGES_SUCCESS");

export const saveNewImagesError = createAction("SAVE_NEW_IMAGES_ERROR");

export const setModalVisibility = createAction(
  "SET_MODAL_VISIBILITY",
  (show: boolean) => ({ show })
);

export const clearStore = createAction("CLEAR_STORE");

export const selectItemForUpdate = createAction(
  "SELECT_ITEM_FOR_UPDATE",
  (data: SelectedItemStore) => ({ data })
);

export const deleteImageStart = createAction("DELETE_IMAGE_START");
export const deleteImageSuccess = createAction("DELETE_IMAGE_SUCCESS");
export const deleteImageError = createAction("DELETE_IMAGE_ERROR");
