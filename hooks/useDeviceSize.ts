import { useEffect, useState } from "react";

const useDeviceSize = () => {

  const isClient = typeof window === "object";
  const [width, setWidth] = useState(isClient ? window.innerWidth : 0);

  const handleWindowResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return [width];

};

export default useDeviceSize;