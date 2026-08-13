import type Wine from "../../models/wine";

type ValidationField = {
  required: boolean;
  validator?: {
    regEx: RegExp;
    error: string;
  };
};

export type ValidationSchema = Partial<Record<keyof Wine, ValidationField>>;

const validationSchema = {
  wineName: {
    required: true,
  },
  wineType: {
    required: true,
  },
  wineYear: {
    required: true,
    validator: {
      regEx: /^[0-9]{4}$/,
      error: "Årgangen må være et gyldig årstall.",
    },
  },
  wineCountry: {
    required: true,
  },
  sanderRating: {
    required: true,
    validator: {
      regEx: /^(10|(\d{1}(\.\d{1,2})))$/,
      error: "Ratingen må være et tall mellom 0.0 og 10.0",
    },
  },
  ineRating: {
    required: true,
    validator: {
      regEx: /^(10|(\d{1}(\.\d{1,2})?))$/,
      error: "Ratingen må være et tall mellom 0.0 og 10.0",
    },
  },
} satisfies ValidationSchema;

export type Errors = Partial<Record<keyof Wine, string>>;

export default validationSchema;
