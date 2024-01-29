import { RouterProvider } from "react-router-dom";

import "./App.scss";

import router from "@/utility/router";
import { useEffect } from "react";

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}

const FallbackLoading = () => {
  // Create simple loading animation
  let count = 0;

  useEffect(() => {
    const interval = setInterval(() => {
      count++;
      const loading = document.querySelector(".loading");

      if (loading) {
        loading.innerHTML = `Loading${".".repeat(count)}`;
      }

      if (count === 4) {
        count = 0;
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <div className="loading">Loading</div>;
};

export default function App() {
  return (
    <RouterProvider router={router} fallbackElement={<FallbackLoading />} />
  );
}
