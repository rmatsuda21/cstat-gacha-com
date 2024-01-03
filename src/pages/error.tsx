import { isRouteErrorResponse, useRouteError } from "react-router-dom";

import styles from "./error.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  if (isRouteErrorResponse(error)) {
    return (
      <div id="error-page" className={styles.wrapper}>
        <FontAwesomeIcon icon={faTriangleExclamation} />
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <span>{error.statusText || error.data?.message}</span>
        </p>
      </div>
    );
  } else {
    return (
      <div id="error-page" className={styles.wrapper}>
        <FontAwesomeIcon icon={faTriangleExclamation} />
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
      </div>
    );
  }
}
