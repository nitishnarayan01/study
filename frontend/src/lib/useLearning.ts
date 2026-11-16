"use client";

import { useCallback, useEffect, useState } from "react";
import { api } from "./api";
import type { ProgMap } from "./curriculum";
import type { Catalog, Progress, User } from "./types";

/** Loads the catalog and the signed-in user's progress, and saves status changes. */
export function useLearning(user: User | null) {
  const [catalog, setCatalog] = useState<Catalog | null>(null);
  const [prog, setProg] = useState<ProgMap>({});
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;
    Promise.all([api.catalog(), api.myProgress()])
      .then(([c, p]) => {
        setCatalog(c);
        setProg(Object.fromEntries(p.map((x) => [x.topic_id, x])));
      })
      .catch((e) => setError(e instanceof Error ? e.message : "Couldn't load your courses."));
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
  }, []);

  return { catalog, prog, setProg, error, setStatus };
}
