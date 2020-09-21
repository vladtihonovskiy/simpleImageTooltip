import React, {
  useState,
  useMemo,
  FunctionComponent,
  useRef,
  MutableRefObject,
  useLayoutEffect,
  useCallback,
} from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { DropzoneDialog } from "material-ui-dropzone";
import Button from "@material-ui/core/Button";
import { updateImage } from "../../../../Store/reducers/selectedItem/actions";
import classes from "./ImageField.module.scss";

type ImageFieldProps = {
  setImageWrapperSize: (size: object) => void;
};

const ImageField: FunctionComponent<ImageFieldProps> = ({
  setImageWrapperSize,
  children,
}) => {
  const dispatch = useDispatch();
  const { selectedItem } = useSelector(
    (state: ImagesToolStore) => ({
      selectedItem: state.selectedItem,
    }),
    shallowEqual
  );
  const [open, setOpen] = useState(false);
  const imageWrapper = useRef() as MutableRefObject<HTMLDivElement>;

  const getImageUrlStyle = useMemo(() => {
    if (selectedItem.imageURL) {
      return {
        backgroundImage: `url(${selectedItem.imageURL})`,
      };
    }
    return {};
  }, [selectedItem.imageURL]);

  useLayoutEffect(() => {
    setImageWrapperSize(imageWrapper.current);
  }, [imageWrapper, setImageWrapperSize]);

  const handelSubmitImage = useCallback(
    (item: File[]) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch(updateImage(reader!.result as string));
        setOpen(false);
      };
      reader.readAsDataURL(item[0]);
    },
    [dispatch]
  );

  const handelChangeDropzoneDialogVisibility = useCallback(
    (visibility: boolean) => () => {
      setOpen(visibility);
    },
    []
  );

  return (
    <div className={classes.image_field}>
      <div className={classes.image_field__container}>
        <div
          ref={imageWrapper}
          className={classes.image_field__image_wrapper}
          style={getImageUrlStyle}
        >
          {selectedItem.showTooltip && children}
          {!selectedItem.imageURL && (
            <div className={classes.image_field__unset_image_wrapper}>
              <p>Image not set</p>
            </div>
          )}
        </div>
      </div>
      <div className={classes.image_field_mobile}>
        <p>Update tooltip position currently not support</p>
      </div>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={handelChangeDropzoneDialogVisibility(true)}
      >
        Add Image
      </Button>

      <DropzoneDialog
        acceptedFiles={["image/*"]}
        cancelButtonText="cancel"
        submitButtonText="submit"
        maxFileSize={5000000}
        open={open}
        filesLimit={1}
        onClose={handelChangeDropzoneDialogVisibility(false)}
        onSave={handelSubmitImage}
        showPreviews
        showFileNamesInPreview
      />
    </div>
  );
};

export default ImageField;
