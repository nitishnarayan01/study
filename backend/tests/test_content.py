"""Checks on content.json itself, so bad content fails CI before it reaches the app."""
import json
import re

from app.seed.seed import DEFAULT_FILE

DATA = json.loads(DEFAULT_FILE.read_text(encoding="utf-8"))
RES = {r["key"] for r in DATA["resources"]}
TOPICS = {t["id"]: t for t in DATA["topics"]}


def test_ids_are_unique():
    assert len(TOPICS) == len(DATA["topics"])


def test_every_lesson_belongs_to_a_full_topic():
    for tid in DATA["lessons"]:
        assert tid in TOPICS, tid
        assert TOPICS[tid]["status"] == "full", tid


def test_full_topics_have_all_fields():
    for t in TOPICS.values():
        if t["status"] == "full":
            for f in ("summary", "why", "do_it", "prove", "interview"):
                assert t[f], f"{t['id']} missing {f}"
            assert t["concepts"], t["id"]


def test_resource_keys_exist():
    for t in TOPICS.values():
        for k in t["resources"]:
            assert k in RES, f"{t['id']} uses unknown resource {k}"
    for tid, lesson in DATA["lessons"].items():
        for k in lesson["deeper"]:
            assert k in RES, f"{tid} uses unknown resource {k}"


def test_resource_urls_are_https():
    for r in DATA["resources"]:
        assert r["url"].startswith("https://"), r["key"]


def test_lesson_format():
    for tid, lesson in DATA["lessons"].items():
        assert lesson["sections"] and lesson["quiz"], tid
        for s in lesson["sections"]:
            assert s["h"] and not re.match(r"^\d+\.", s["h"]), f"{tid}: numbered heading {s['h']!r}"
        for q in lesson["quiz"]:
            assert len(q) == 2 and all(q), tid
