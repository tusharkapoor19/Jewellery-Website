import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const NAVBAR_HEIGHT = 90;

const ScrollToHash = () => {
  const location = useLocation();

  useEffect(() => {
    const scroll = () => {
      if (!location.hash) {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        return;
      }

      const id = location.hash.replace("#", "");

      const element = document.getElementById(id);

      if (!element) return;

      const y =
        element.getBoundingClientRect().top +
        window.pageYOffset -
        NAVBAR_HEIGHT;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    };

    const timer = setTimeout(scroll, 150);

    return () => clearTimeout(timer);
  }, [location]);

  return null;
};

export default ScrollToHash;