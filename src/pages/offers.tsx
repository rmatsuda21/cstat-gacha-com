import { useLoaderData } from "react-router-dom";

import styles from "./offers.module.scss";
import { Offer } from "@/types/Offers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faClipboard,
  faRightLeft,
  faStore,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import copy from "copy-to-clipboard";
import { enqueueSnackbar } from "notistack";
import { useRef } from "react";

const OfferDisplay = ({ offer }: { offer: Offer }) => {
  const infoRef = useRef<HTMLDivElement>(null);

  const handleCopyClick = () => {
    const command = `$accept <@${offer.id}>`;
    copy(command);
    enqueueSnackbar("Copied Discord command", {
      variant: "success",
      autoHideDuration: 2000,
    });
  };

  const handleInfoClick = () => {
    console.log("CLICK");
    infoRef.current?.classList.add(styles.active);
  };

  const handleCloseClick = () => {
    infoRef.current?.classList.remove(styles.active);
  };

  return (
    <div className={styles.offer}>
      <div className={styles.img}>
        <img src={offer.offer_img} />
        <span className={styles.left}>x{offer.offer_quantity}</span>
      </div>
      <div className={styles.center}>
        <button onClick={handleInfoClick}>
          <FontAwesomeIcon icon={faCircleInfo} />
        </button>
        <FontAwesomeIcon icon={faRightLeft} />
        <button onClick={handleCopyClick}>
          <FontAwesomeIcon icon={faClipboard} />
        </button>
      </div>
      <div className={styles.img}>
        <img src={offer.accept_img} />
        <span className={styles.right}>x{offer.accept_quantity}</span>
      </div>
      <div ref={infoRef} className={`${styles.info}`}>
        <button onClick={handleCloseClick}>
          <FontAwesomeIcon icon={faX} />
        </button>
        <span>
          {offer.offer_name} x{offer.accept_quantity}
        </span>
        <span>for</span>
        <span>
          {offer.accept_name} x{offer.accept_quantity}
        </span>
      </div>
    </div>
  );
};

const OffersPage = () => {
  const data = useLoaderData() as any;
  const offers = data?.offers as Offer[];

  if (!offers || offers.length === 0) {
    return (
      <div className={styles.notFound}>
        <h2>No offers found</h2>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <h1>
        <FontAwesomeIcon icon={faStore} /> Offers
      </h1>
      <div className={styles.header}>
        <h2>Recieve</h2>
        <h2>Give</h2>
      </div>
      <div className={styles.offers}>
        {offers.map((offer) => (
          <OfferDisplay offer={offer} />
        ))}
      </div>
    </div>
  );
};

export default OffersPage;
