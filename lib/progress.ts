"use client";

import { useCallback, useEffect, useState } from "react";

// Progress lives in this browser only. It's a convenience, so every
// read and write tolerates storage being blocked or cleared.
const KEY = "aws101-progress-v1";
const EVENT = "aws101-progress";

type Store = Record<string, boolean>;

function read(): Store {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}") as Store;
  } catch {
    return {};
  }
}

function write(store: Store) {
  try {
    localStorage.setItem(KEY, JSON.stringify(store));
  } catch {
    // Storage unavailable; progress just won't persist.
  }
  window.dispatchEvent(new Event(EVENT));
}

export function useProgress() {
  const [store, setStore] = useState<Store>({});

  useEffect(() => {
    const sync = () => setStore(read());
    sync();
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const set = useCallback((id: string, done: boolean) => {
    write({ ...read(), [id]: done });
  }, []);

  const reset = useCallback(() => write({}), []);

  return { done: (id: string) => !!store[id], set, reset, store };
}
