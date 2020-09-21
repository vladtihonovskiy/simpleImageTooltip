import React, { FunctionComponent, useMemo } from "react";
import ImagesItem from "./Components/ImagesItem/ImagesItem";
import classes from "./ImagesGrid.module.scss";

type ImagesGridProps = {
  data: object;
};

const ImagesGrid: FunctionComponent<ImagesGridProps> = ({ data }) => {
  const modifyData = useMemo(() => {
    if (data) {
      return Object.values(data);
    }
    return [];
  }, [data]);
  return (
    <section className={classes.images_grid}>
      {modifyData.length > 0 ? (
        <div className="container">
          <div className={classes.images_grid__wrapper}>
            {modifyData.map((item: any) => (
              <ImagesItem key={item.id} data={item} />
            ))}
          </div>
        </div>
      ) : (
        <p>You don't have any images in the gallery</p>
      )}
    </section>
  );
};

export default ImagesGrid;
