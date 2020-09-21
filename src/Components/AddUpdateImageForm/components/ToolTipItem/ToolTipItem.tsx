import React, {
  FunctionComponent,
  useMemo,
  useRef,
  useState,
  MutableRefObject,
  useLayoutEffect,
  useCallback,
} from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import classes from "./ToolTipItem.module.scss";
import { updateToolTipPosition } from "../../../../Store/reducers/selectedItem/actions";

type ToolTipItemProps = {
  imageWrapperSize: any;
};

const ToolTipItem: FunctionComponent<ToolTipItemProps> = ({
  imageWrapperSize,
}) => {
  const dispatch = useDispatch();
  const { currentItemStoredPosition, selectedItem } = useSelector(
    (state: ImagesToolStore) => ({
      currentItemStoredPosition: state.selectedItem.position,
      selectedItem: state.selectedItem,
    }),
    shallowEqual
  );

  const [toolTipPosition, setToolTipPosition] = useState({
    ...currentItemStoredPosition,
    ...{ currentX: 0, currentY: 0 },
  });

  const handelToolTipPosition = useCallback((cordinate: any) => {
    setToolTipPosition(cordinate);
  }, []);

  const toolTipItem = useRef() as MutableRefObject<HTMLDivElement>;

  const [dragMouseDownState, setDragMouseDown] = useState(false);

  const { textColor, tooltipColor, showTooltip, text } = selectedItem;
  const toolTipStyle = useMemo(() => {
    return {
      color: textColor,
      backgroundColor: tooltipColor,
    };
  }, [textColor, tooltipColor]);

  const dragMouseDown = (e: any) => {
    setDragMouseDown(true);
    // get the mouse cursor position at startup:
    handelToolTipPosition({
      ...toolTipPosition,
      ...{ currentX: e.clientX, currentY: e.clientY },
    });
  };
  const onDragFinish = useCallback(
    () => {
      setDragMouseDown(false);

      const fullWith =
      imageWrapperSize.offsetWidth - toolTipItem.current.clientWidth;
      const fullHeight =
        imageWrapperSize.offsetHeight - toolTipItem.current.clientHeight;
      let topPercent: number =
        (toolTipItem.current.offsetTop * 100) / fullHeight;
      topPercent = topPercent > 100 ? 100 : topPercent;
      topPercent = topPercent < 0 ? 0 : topPercent;

      let leftPercent: number =
        (toolTipItem.current.offsetLeft * 100) / fullWith;
      leftPercent = leftPercent > 100 ? 100 : leftPercent;
      leftPercent = leftPercent < 0 ? 0 : leftPercent;
      const updatePositionObj = {
        x:
          toolTipItem.current.offsetLeft >= 0
            ? -toolTipItem.current.offsetLeft
          : 0,
        y:
          toolTipItem.current.offsetTop >= 0
            ? -toolTipItem.current.offsetTop
            : 0,
        topPercent: topPercent,
        leftPercent: leftPercent,
      };
      dispatch(updateToolTipPosition(updatePositionObj));
    },
    [imageWrapperSize, dispatch, toolTipItem]
  );

  useLayoutEffect(() => {
    if (toolTipItem.current) {
      const { x, y } = currentItemStoredPosition;
      if(`${-x}px` !== toolTipItem.current.style.left ) {
        toolTipItem.current.style.top = `${toolTipItem.current.offsetTop - y}px`;
        toolTipItem.current.style.left = `${
          toolTipItem.current.offsetLeft - x
        }px`;
      }
    }
  }, [toolTipItem, currentItemStoredPosition]);

  const elementDrag = (e: any) => {
    if (dragMouseDownState) {
      e.preventDefault();
      let x = toolTipPosition.currentX - e.clientX;
      let y = toolTipPosition.currentY - e.clientY;
      const currentX = e.clientX;
      const currentY = e.clientY;
      if (e.currentTarget.offsetTop <= -5) {
        y += e.currentTarget.offsetTop;
      }
      if (e.currentTarget.offsetLeft <= -5) {
        x += e.currentTarget.offsetLeft;
      }
      if (
        e.currentTarget.offsetLeft >=
        imageWrapperSize.offsetWidth - e.currentTarget.offsetWidth - 5
      ) {
        x += 5;
      }
      if (
        e.currentTarget.offsetTop >=
        imageWrapperSize.offsetHeight - e.currentTarget.offsetHeight
      ) {
        y += 10;
      }
      toolTipItem.current.style.top = `${toolTipItem.current.offsetTop - y}px`;
      toolTipItem.current.style.left = `${
        toolTipItem.current.offsetLeft - x
      }px`;
      handelToolTipPosition({
        x,
        y,
        currentX,
        currentY,
      });
    }
  };

  if (showTooltip) {
    return (
      <div
        onMouseDown={dragMouseDown}
        onMouseMove={elementDrag}
        onMouseUp={onDragFinish}
        onMouseLeave={onDragFinish}
        ref={toolTipItem}
        className={classes.tooltip_text}
        style={toolTipStyle}
      >
        {text}
      </div>
    );
  }
  return null;
};

export default ToolTipItem;
