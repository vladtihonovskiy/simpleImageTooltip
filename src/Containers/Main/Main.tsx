import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Button, Modal } from "@material-ui/core";
import { fetchImagesStart } from "../../Store/reducers/imagesTool/actions";
import { setModalVisibility } from "../../Store/reducers/selectedItem/actions";
import WithLoader from "../../HOC/WithLoader/WithLoader";
import AddUpdateImageForm from "../../Components/AddUpdateImageForm/AddUpdateImageForm";
import ImagesGrid from "../ImagesGrid/ImagesGrid";
import classes from "./Main.module.scss";

const Main = () => {
  const dispatch = useDispatch();

  const handelModalOpen = useCallback(() => {
    dispatch(setModalVisibility(false));
  }, [dispatch]);

  const handelModalClose = useCallback(() => {
    dispatch(setModalVisibility(true));
  }, [dispatch]);

  const { imagesTool, usersRequestStatus, showModal } = useSelector(
    (state: ImagesToolStore) => ({
      imagesTool: state.imagesTool.data,
      usersRequestStatus: state.imagesTool.usersRequestStatus,
      showModal: state.selectedItem.showModal,
    }),
    shallowEqual
  );

  useEffect(() => {
    // fetch images from local storage
    dispatch(fetchImagesStart());
  }, [dispatch]);

  return (
    <WithLoader loadingStatus={usersRequestStatus}>
      <section className={classes.main}>
        <div className="container">
          <Button
            onClick={handelModalClose}
            fullWidth
            variant="contained"
            color="primary"
          >
            Add New Image
          </Button>

          <Modal open={showModal} onClose={handelModalOpen}>
            <AddUpdateImageForm />
          </Modal>
        </div>
      </section>
      <ImagesGrid data={imagesTool} />
    </WithLoader>
  );
};

export default Main;
