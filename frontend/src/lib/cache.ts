"use client";

import { api } from "./api";
import type { ProgMap } from "./curriculum";
import type { Catalog, TopicDetail } from "./types";

/**
 * In-memory cache for data that rarely changes while you study, so moving between pages
 * doesn't wait for the server again. It lives only in this browser tab and is cleared on log out
 * or when a different user signs in.
 */
let owner: number | null = null;
let catalog: Catalog | null = null;
let catalogReq: Promise<Catalog> | null = null;
let progress: ProgMap | null = null;
const topics = new Map<string, TopicDetail>();
const topicReqs = new Map<string, Promise<TopicDetail>>();

export function bindCacheTo(userId: number) {
  if (owner !== userId) {
    clearCache();
    owner = userId;
  }
}

export function clearCache() {
  owner = null;
  catalog = null;
  catalogReq = null;
  progress = null;
  topics.clear();
  topicReqs.clear();
}

export const peekCatalog = () => catalog;
export const peekProgress = () => progress;
export const peekTopic = (id: string) => topics.get(id) ?? null;

export function rememberProgress(p: ProgMap) {
  progress = p;
}

export function loadCatalog(): Promise<Catalog> {
  if (catalog) return Promise.resolve(catalog);
  if (!catalogReq) {
    catalogReq = api.catalog()
      .then((c) => (catalog = c))
      .finally(() => { catalogReq = null; });
  }
  return catalogReq;
}

export async function loadProgress(): Promise<ProgMap> {
  const list = await api.myProgress();
  progress = Object.fromEntries(list.map((x) => [x.topic_id, x]));
  return progress;
}

export function loadTopic(id: string): Promise<TopicDetail> {
  const hit = topics.get(id);
  if (hit) return Promise.resolve(hit);
  let req = topicReqs.get(id);
  if (!req) {
    req = api.topic(id)
      .then((t) => { topics.set(id, t); return t; })
      .finally(() => { topicReqs.delete(id); });
    topicReqs.set(id, req);
  }
  return req;
}

/** Fetch a topic in the background so opening it next is instant. Errors are ignored. */
export function prefetchTopic(id: string) {
  if (!topics.has(id)) loadTopic(id).catch(() => undefined);
}
