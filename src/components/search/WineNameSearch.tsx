import { useEffect, useRef, useState } from "react";
import SearchIcon from "../../icons/SearchIcon";
import styles from "./winesearch.module.css";

const DEBOUNCE_MS = 300;

type Props = {
  value: string;
  onChange: (value: string) => void;
};

/** Keeps a local draft and only reports it after the user stops typing. */
export const WineNameSearch = ({ value, onChange }: Props) => {
  const [draft, setDraft] = useState(value);
  const lastSentRef = useRef(value);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );

  // Follow outside changes (back/forward, removing the chip, "Tøm søk").
  useEffect(() => {
    if (value !== lastSentRef.current) {
      clearTimeout(timeoutRef.current);
      lastSentRef.current = value;
      setDraft(value);
    }
  }, [value]);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const handleChange = (next: string) => {
    setDraft(next);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      lastSentRef.current = next;
      onChange(next);
    }, DEBOUNCE_MS);
  };

  return (
    <div
      className={`wine-input-container ${styles["wine-search__name-input"]}`}
    >
      <SearchIcon />
      <input
        type="search"
        autoComplete="off"
        name="q"
        aria-label="Søk på navn"
        placeholder="Søk på navn"
        value={draft}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};
