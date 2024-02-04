import React, { useState } from "react";
import { ToTopIcon } from "../../Utilities/IconSVG";
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <button
      onClick={scrollToTop}
      style={{ display: visible ? "inline" : "none" }}
      className="p-2
      bg-white hover:bg-gray-100 opacity-40 hover:opacity-80  border border-gray-400 shadow  rounded-full fixed bottom-2 right-2"
    >
      <ToTopIcon />
    </button>
  );
};

export default ScrollButton;
