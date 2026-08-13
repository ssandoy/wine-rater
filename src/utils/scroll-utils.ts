import type { RefObject } from "react";

const scrollToRef = (ref: RefObject<HTMLElement | null>) => {
  if (ref.current) {
    window.scrollTo(0, ref.current.offsetTop);
  }
};

export const executeScrollToRef = (ref: RefObject<HTMLElement | null>) =>
  scrollToRef(ref);
