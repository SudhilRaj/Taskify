const STORAGE_KEY_PREFFIX = "my-app:";
export const STORAGE_KEYS = {
  APP_TOKEN: "APP_TOKEN",
};
const MAP_KEYS_NAMES = {
  [STORAGE_KEYS.APP_TOKEN]: `${STORAGE_KEY_PREFFIX}app-token`,
};
export const REQUIRED_STORAGE_KEYS = [STORAGE_KEYS.APP_TOKEN];

export const storage = {
  setItem: (key: string, value: string | number | null | any) =>
    localStorage.setItem(MAP_KEYS_NAMES[key], JSON.stringify(value ?? null)),
  getItem: (key: string) => {
    const newValue =
      localStorage.getItem(MAP_KEYS_NAMES[key]) !== "undefined"
        ? localStorage.getItem(MAP_KEYS_NAMES[key])
        : null;
    return newValue ? JSON.parse(newValue ?? null) : null;
  },
  removeItem: (key: string) => localStorage.removeItem(MAP_KEYS_NAMES[key]),
  // clear: () => {
  //   for (const storageKey in localStorage) {
  //     if (storageKey(STORAGE_KEY_PREFFIX) !== -1)
  //       localStorage.removeItem(storageKey);
  //   }
  // },
};
