import React, { useCallback } from "react";
import { Switch, TextField } from "@material-ui/core";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import InputColor, { Color } from "react-input-color";
import {
  setToolTipVisibility,
  updateText,
  updateTooltipColor,
  updateTextColor,
} from "../../../../Store/reducers/selectedItem/actions";
import classes from "./ToolTipControlPanel.module.scss"

const MAX_INPUT_LENGTH = 20;

const TooltipControlPanel = () => {
  const dispatch = useDispatch();
  const { selectedItem } = useSelector(
    (state: ImagesToolStore) => ({
      selectedItem: state.selectedItem,
    }),
    shallowEqual
  );
  const handleChangeSwitcher = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setToolTipVisibility(event.target.checked));
  };

  const handleTooltipTextChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(updateText(event.target.value));
  };

  const handelChangeToolTipColor = useCallback(
    (value: Color) => {
      dispatch(updateTooltipColor(value.hex));
    },
    [dispatch]
  );

  const handelChangeTextColor = useCallback(
    (value: Color) => {
      dispatch(updateTextColor(value.hex));
    },
    [dispatch]
  );

  const { showTooltip, text, tooltipColor, textColor } = selectedItem;
  return (
    <div>
      <div className={classes.tool_tip_control_panel__row}>
        <p>Show Tooltip</p>
        <Switch checked={showTooltip} onChange={handleChangeSwitcher} />
      </div>
      {showTooltip && (
        <>
          <div>
            <TextField
              required
              value={text}
              inputProps={{ maxLength: MAX_INPUT_LENGTH }}
              label="Tooltip text"
              variant="outlined"
              type="text"
              fullWidth
              onChange={handleTooltipTextChange}
            />
          </div>
          <div className={classes.tool_tip_control_panel__row}>
            <p> Tooltip Color</p>
            <InputColor
              initialValue={tooltipColor}
              onChange={handelChangeToolTipColor}
              placement="right"
            />
          </div>
          <div className={classes.tool_tip_control_panel__row}>
            <p>Text Color</p>
            <InputColor
              initialValue={textColor}
              onChange={handelChangeTextColor}
              placement="right"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default TooltipControlPanel;
