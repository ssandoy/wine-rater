export const pushOrRemoveToArray = <T>(array: readonly T[], item: T): T[] => {
  const tmp = [...array];
  const exists = tmp.includes(item);
  if (exists) {
    return tmp.filter((c) => c !== item);
  } else {
    tmp.push(item);
    return tmp;
  }
};

const normalize = (value: string) => value.trim().toLowerCase();

/** True when nothing is selected, or when one of the values equals a selected one (ignoring case). */
export const matchesAny = (
  values: string | string[] | null | undefined,
  selected: readonly string[]
): boolean => {
  if (!selected.length) {
    return true;
  }
  const normalized = new Set(
    (Array.isArray(values) ? values : [values ?? ""]).map(normalize)
  );
  return selected.some((value) => normalized.has(normalize(value)));
};

/** Trimmed, non-empty, unique values sorted alphabetically. */
export const uniqueSorted = (
  values: ReadonlyArray<string | null | undefined>
): string[] =>
  [
    ...new Set(
      values
        .map((value) => value?.trim())
        .filter((value): value is string => !!value)
    ),
  ].sort((a, b) => a.localeCompare(b, "nb"));
