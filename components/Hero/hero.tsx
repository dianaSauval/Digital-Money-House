import { useState, useEffect } from "react";
import HeroDesktop from "./Versiones/heroDesktop";
import HeroMobile from "./Versiones/heroMobile";
import HeroTablet from "./Versiones/heroTablet";
import useDeviceSize from "../../hooks/useDeviceSize";

export const Hero = () => {

  const [heroDisplayed, setHeroDisplayed] = useState(<HeroDesktop />);
  const [width] = useDeviceSize();

  useEffect(() => {
    if (width <= 768) {
      setHeroDisplayed(<HeroMobile />);
    } else if (width < 1025) {
      setHeroDisplayed(<HeroTablet />);
    } else {
      setHeroDisplayed(
        <HeroDesktop />
      );
    }
  }, [width]);
  return (
    <>{heroDisplayed}</>
    //
  );
};
