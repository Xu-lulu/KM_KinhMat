import { PURGE } from "redux-persist";

export const purgeStoredData = () => {
  return { type: PURGE, key: "root", result: () => null };
};
