import { useSyncExternalStore } from "react";

const nativeQuery = window.matchMedia("(max-width: 598px)");

const subscribe = (onChange: () => void) => {
  nativeQuery.addEventListener("change", onChange);
  return () => nativeQuery.removeEventListener("change", onChange);
};

export const useIsNative = () =>
  useSyncExternalStore(subscribe, () => nativeQuery.matches);
