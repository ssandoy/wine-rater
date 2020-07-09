import { RefObject } from "react";

const scrollToRef = (ref: RefObject<HTMLElement>) => {
  if (ref.current) {
    window.scrollTo(0, ref.current.offsetTop);
  }
};

export const executeScrollToRef = (ref: RefObject<HTMLElement>) => scrollToRef(ref);
