import React, {
  FunctionComponent,
  MutableRefObject,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import { selectItemForUpdate } from "../../../../Store/reducers/selectedItem/actions";
import classes from "./ImagesItem.module.scss";

type ImagesItemProps = {
  data: SelectedItemStore;
};

const ImagesItem: FunctionComponent<ImagesItemProps> = ({ data }) => {
  const {
    imageURL,
    position,
    textColor,
    text,
    tooltipColor,
    showTooltip,
  } = data;
  const dispatch = useDispatch();
  const imageRef = useRef() as MutableRefObject<HTMLDivElement>;
  const [imageRefState, setImageRef] = useState(null as any);

  useLayoutEffect(() => {
    if (imageRef && imageRef.current) {
      setImageRef(imageRef.current as any);
    }
  }, [imageRef]);
  const getImageUrlStyle = useMemo(() => {
    if (imageURL) {
      return {
        backgroundImage: `url(${imageURL})`,
      };
    }
    return {};
  }, [imageURL]);

  const handelItemClick = useCallback(() => {
    dispatch(selectItemForUpdate({ ...data }));
  }, [data, dispatch]);

  const getToolTipStyle = useMemo(() => {
    if (imageRefState) {
      // we set the top and left in percent if percent  will be  100% the tooltip will be outside block
      let calculateTopPercent =
        +position.topPercent <= 5 ? 5 : position.topPercent;
      calculateTopPercent =
        calculateTopPercent >= 93 ? 93 : calculateTopPercent;
      let calculatePercent =
        +position.leftPercent <= 7 ? 7 : position.leftPercent;
      calculatePercent = calculatePercent >= 93 ? 93 : calculatePercent;
      const elementStyle: { [key: string]: string | number } = {
        color: textColor,
        backgroundColor: tooltipColor,
        top: `calc(${calculateTopPercent}% - ${
          imageRefState.clientHeight / 2
        }px)`,
        left: `calc(${calculatePercent}% - ${imageRefState.clientWidth / 2}px)`,
      };
      if (!showTooltip) {
        elementStyle.opacity = 0;
      }
      return elementStyle;
    }
    return {};
  }, [
    imageRefState,
    position.leftPercent,
    position.topPercent,
    showTooltip,
    textColor,
    tooltipColor,
  ]);
  return (
    <div
      onClick={handelItemClick}
      className={classes.images_item}
      style={getImageUrlStyle}
    >
      <div
        ref={imageRef}
        className={classes.images_item__tooltip}
        style={getToolTipStyle}
      >
        {text}
      </div>
    </div>
  );
};

export default ImagesItem;
