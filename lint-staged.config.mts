import type { Configuration } from "lint-staged";

const config: Configuration = {
  "*": [
    "biome check --write --no-errors-on-unmatched --files-ignore-unknown=true",
    () => "knip",
  ],
};

export default config;
