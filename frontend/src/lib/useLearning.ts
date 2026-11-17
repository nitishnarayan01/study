"use client";

import { useCallback, useEffect, useState } from "react";
import { api } from "./api";
import { loadCatalog, loadProgress, peekCatalog, peekProgress, rememberProgress, bindCacheTo } from "./cache";
import type { ProgMap } from "./curriculum";
import type { Catalog, Progress, User } from "./types";

/**
 * Loads the catalog and the signed-in user's progress, and saves status changes.
 * Shows cached data straight away and refreshes progress quietly in the background.
 */
export function useLearning(user: User | null) {
  if (user) bindCacheTo(user.id);
  const [catalog, setCatalog] = useState<Catalog | null>(() => (user ? peekCatalog() : null));
  const [prog, setProgState] = useState<ProgMap>(() => (user ? peekProgress() ?? {} : {}));
  const [error, setError] = useState("");

  const setProg = useCallback((next: ProgMap | ((p: ProgMap) => ProgMap)) => {
    setProgState((p) => {
      const value = typeof next === "function" ? next(p) : next;
      rememberProgress(value);
      return value;
    });
  }, []);

  useEffect(() => {
    if (!user) return;
    let live = true;
    Promise.all([loadCatalog(), loadProgress()])
      .then(([c, p]) => {
        if (!live) return;
        setCatalog(c);
        setProgState(p);
      })
      .catch((e) => live && setError(e instanceof Error ? e.message : "Couldn't load your courses."));
    return () => { live = false; };
  }, [user]);

  const setStatus = useCallback(async (topicId: string, status: number) => {
    setProg((p) => ({
      ...p,
      [topicId]: { ...(p[topicId] ?? { topic_id: topicId, confidence: 0, key_points: [], notes: "" }), status },
    }));
    try {
      const saved: Progress = await api.saveProgress(topicId, { status });
      setProg((p) => ({ ...p, [topicId]: saved }));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't save.");
    }
  }, [setProg]);

  return { catalog, prog, setProg, error, setStatus };
}
