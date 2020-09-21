import React, { useState, useCallback, useMemo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import ImageField from "./components/ImageField/ImageField";
import TooltipControlPanel from "./components/TooltipControlPanel/ToolTipControlPanel";
import ToolTipItem from "./components/ToolTipItem/ToolTipItem";
import {
  deleteImageStart,
  saveNewImageStart,
  updateImageObjectStart,
} from "../../Store/reducers/selectedItem/actions";
import WithLoader from "../../HOC/WithLoader/WithLoader";
import classes from "./AddUpdateImageForm.module.scss";

const AddUpdateImageForm = () => {
  const dispatch = useDispatch();

  const [imageWrapperSize, setImageWrapperSize] = useState(null);

  const setImageWrapper = useCallback((element) => {
    setImageWrapperSize(element);
  }, []);

  const saveNewImageToGallery = useCallback(() => {
    dispatch(saveNewImageStart());
  }, [dispatch]);

  const updateImageHandler = useCallback(() => {
    dispatch(updateImageObjectStart());
  }, [dispatch]);

  const deleteImageHandler = useCallback(() => {
    dispatch(deleteImageStart());
  }, [dispatch]);

  const { type, loading } = useSelector(
    (state: ImagesToolStore) => ({
      type: state.selectedItem.type,
      loading: state.selectedItem.loadingStatus,
    }),
    shallowEqual
  );

  const renderControlButton = useMemo(() => {
    if (type === "create") {
      return (
        <Button
          classes={{
            root: classes.add_update_image_form__control_button,
          }}
          fullWidth
          onClick={saveNewImageToGallery}
          variant="outlined"
          color="primary"
        >
          Add Image To Gallery
        </Button>
      );
    }
    return (
      <>
        <Button
          fullWidth
          classes={{
            root: classes.add_update_image_form__control_button,
          }}
          onClick={updateImageHandler}
          variant="outlined"
          color="primary"
        >
          Update Image
        </Button>
        <Button
          classes={{
            root: classes.add_update_image_form__control_button,
          }}
          fullWidth
          onClick={deleteImageHandler}
          variant="outlined"
          color="secondary"
        >
          Delete Image
        </Button>
      </>
    );
  }, [deleteImageHandler, saveNewImageToGallery, type, updateImageHandler]);

  return (
    <div className={classes.add_update_image_form}>
      <WithLoader loadingStatus={loading}>
        <ImageField setImageWrapperSize={setImageWrapper}>
          <ToolTipItem imageWrapperSize={imageWrapperSize} />
        </ImageField>
        <TooltipControlPanel />
        {renderControlButton}
      </WithLoader>
    </div>
  );
};

export default AddUpdateImageForm;
