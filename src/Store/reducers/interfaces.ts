// @ts-ignore

declare interface ImagesTool {
  data: {};
  usersRequestStatus: string;
}

declare interface ImagesToolStore {
  imagesTool: ImagesTool;
  selectedItem: SelectedItemStore;
}

declare interface SelectedItemStore {
  text: string;
  tooltipColor: string;
  textColor: string;
  id: string;
  imageURL: string;
  showTooltip: boolean;
  position: {
    x: number;
    y: number;
    topPercent: string;
    leftPercent: string;
  };
  type: string;
  details: string;
  loadingStatus: string;
  showModal: boolean;
}
