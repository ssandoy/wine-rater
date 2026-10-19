import { type DataSnapshot, get, ref } from "firebase/database";
import {
  createContext,
  type PropsWithChildren,
  use,
  useEffect,
  useState,
} from "react";
import { useFirebaseContext } from "../firebase";
import { snapshotToArray } from "../firebase/firebase-setup";
import { INDICES } from "../firebase/indices";
import type Wine from "../models/wine";

const WINE_FETCH_TIMEOUT_MS = 10_000;

type WinesStatus = "loading" | "error" | "ready";

type WinesState = {
  wines: Wine[];
  status: WinesStatus;
  /** Refetches after an error, showing the loading state. */
  retry: () => void;
  /** Refetches in the background, keeping the current list visible. */
  refresh: () => void;
};

type FetchRequest = { attempt: number; background: boolean };

const WinesContext = createContext<WinesState | undefined>(undefined);

const sortByRating = (wines: Wine[]) =>
  wines.sort(
    (obj1: Wine, obj2: Wine) =>
      +obj2.sanderRating +
      +obj2.ineRating -
      (+obj1.sanderRating + +obj1.ineRating)
  );

const WinesProvider = ({ children }: PropsWithChildren) => {
  const { database } = useFirebaseContext();
  const [wines, setWines] = useState<Wine[]>([]);
  const [status, setStatus] = useState<WinesStatus>("loading");
  const [fetchRequest, setFetchRequest] = useState<FetchRequest>({
    attempt: 0,
    background: false,
  });

  useEffect(() => {
    const { background } = fetchRequest;
    // Aborted when the request settles or the effect is cleaned up.
    const controller = new AbortController();
    const timeout = new Promise<never>((_, reject) => {
      const timeoutId = setTimeout(
        () => reject(new Error("Wine request timed out")),
        WINE_FETCH_TIMEOUT_MS
      );
      controller.signal.addEventListener("abort", () =>
        clearTimeout(timeoutId)
      );
    });

    if (!background) {
      setStatus("loading");
    }

    Promise.race([get(ref(database, INDICES.WINES_INDEX)), timeout])
      .then((wineItemsSnapshot: DataSnapshot) => {
        if (controller.signal.aborted) {
          return;
        }

        setWines(sortByRating(snapshotToArray<Wine>(wineItemsSnapshot)));
        setStatus("ready");
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) {
          return;
        }

        console.error("Failed to fetch saved wines", error);
        // A failed background refresh keeps the list that is already shown.
        if (!background) {
          setStatus("error");
        }
      })
      .finally(() => controller.abort());

    return () => controller.abort();
  }, [database, fetchRequest]);

  const value: WinesState = {
    wines,
    status,
    retry: () =>
      setFetchRequest(({ attempt }) => ({
        attempt: attempt + 1,
        background: false,
      })),
    refresh: () =>
      setFetchRequest(({ attempt }) => ({
        attempt: attempt + 1,
        background: true,
      })),
  };

  return <WinesContext value={value}>{children}</WinesContext>;
};

const useWines = () => {
  const context = use(WinesContext);
  if (!context) {
    throw new Error("useWines must be used within a WinesProvider");
  }
  return context;
};

export { useWines, WinesProvider };
