import { createReducer } from "redux-act";
import * as actionTypes from "./actions";

const initialState: SelectedItemStore = {
  text: "",
  tooltipColor: "#5e72e4",
  textColor: "#fff",
  id: "",
  imageURL: "",
  showTooltip: false,
  position: {
    x: 0,
    y: 0,
    topPercent: "",
    leftPercent: "",
  },
  type: "create",
  details: "",
  loadingStatus: "",
  showModal: false,
};

const reducer = createReducer<typeof initialState>({}, initialState);

reducer.on(
  actionTypes.setToolTipVisibility,
  (state, payload: { show: boolean }) => ({
    ...state,
    showTooltip: payload.show,
  })
);
reducer.on(
  actionTypes.setModalVisibility,
  (state, payload: { show: boolean }) => ({
    ...state,
    showModal: payload.show,
  })
);
reducer.on(actionTypes.updateText, (state, payload: { text: string }) => ({
  ...state,
  text: payload.text,
}));

reducer.on(
  actionTypes.updateTextColor,
  (state, payload: { color: string }) => ({
    ...state,
    textColor: payload.color,
  })
);
reducer.on(
  actionTypes.updateTooltipColor,
  (state, payload: { color: string }) => ({
    ...state,
    tooltipColor: payload.color,
  })
);
reducer.on(actionTypes.updateImage, (state, payload: { url: string }) => ({
  ...state,
  imageURL: payload.url,
}));
reducer.on(
  actionTypes.updateToolTipPosition,
  (state, payload: { position: any }) => ({
    ...state,
    position: payload.position,
  })
);
reducer.on(
  [
    actionTypes.saveNewImageStart,
    actionTypes.updateImageObjectStart,
    actionTypes.deleteImageStart,
  ] as any,
  (state) => ({
    ...state,
    loadingStatus: "pending",
  })
);
reducer.on(
  [
    actionTypes.updateImageObjectSuccess,
    actionTypes.saveNewImagesSuccess,
  ] as any,
  (state) => ({
    ...state,
    loadingStatus: "success",
  })
);
reducer.on(actionTypes.saveNewImagesError, (state) => ({
  ...state,
  loadingStatus: "reject",
}));
reducer.on(actionTypes.selectItemForUpdate, (state, payload) => ({
  ...state,
  ...payload.data,
  type: "update",
  showModal: true,
}));
reducer.on(actionTypes.clearStore, (state) => ({
  ...state,
  ...initialState,
}));

export default reducer;
