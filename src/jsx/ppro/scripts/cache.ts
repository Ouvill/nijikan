type Store = {
  [key: string]: string;
};

export type Connection<S extends Record<string, any>> = {
  get: <K extends keyof S>(key: K) => S[K] | undefined;
  set: <K extends keyof S>(key: K, value: S[K]) => void;
  clear: () => void;
};

export const initCache = <S extends Record<string, any>>(initialState: S) => {
  let cache: S = initialState;
  const connection: Connection<S> = {
    get: (key) => {
      return cache[key];
    },
    set: (key, value) => {
      cache[key] = value;
    },
    clear: () => {
      cache = initialState;
    },
  };

  return connection;
};
