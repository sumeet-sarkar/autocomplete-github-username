import { CONFIG } from "./config";

const { cacheSeparator, cacheInterval } = CONFIG;

function store(key: string, value: string) {
  const finalValue = `${value}${cacheSeparator}${Date.now().toString()}`;
  localStorage.setItem(key, finalValue);
}

interface IsValidResponse {
  isValid: boolean;
  value?: string;
}

function isValid(key: string): IsValidResponse {
  const value = localStorage.getItem(key);
  if (value === null) {
    return {
      isValid: false,
    };
  }

  const values = value.split(cacheSeparator);
  const timestamp = Number(values[1]);
  if (Number.isNaN(timestamp)) {
    return {
      isValid: false,
    };
  }

  const date = new Date(timestamp);
  if (date.toString() === "Invalid Date") {
    return {
      isValid: false,
    };
  }

  if (Date.now() - date.getTime() < cacheInterval) {
    return {
      isValid: true,
      value: values[0],
    };
  }
  localStorage.removeItem(key);
  return {
    isValid: false,
  };
}

export const cache = {
  store,
  isValid,
};
