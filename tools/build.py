#!/usr/bin/env python3
"""Strudla build + validation.

Reads locales/sr-latn.json (the only hand-maintained file) and produces:
  locales/sr-cyrl.json   full Cyrillic locale, transliterated 1:1
  dist/strudla.js        single-file loader with both locales embedded

Validation runs on every build:
  1. every English key must exist in Strudel's canonical registered-name list
  2. no Serbian alias may collide with an English canonical name
  3. no Serbian alias may be claimed by two different English keys
  4. structural parity against the Icelandic locale (the reference dialect)
  5. every alias must be a valid JS identifier

Usage:
    python tools/build.py [--canon <file>] [--icelandic <file>]
"""
import argparse
import json
import re
import sys
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

# Serbian Latin -> Cyrillic. Digraphs MUST be replaced before single letters,
# otherwise "nj" becomes "нј" instead of "њ".
DIGRAPHS = [("dž", "џ"), ("Dž", "Џ"), ("DŽ", "Џ"),
            ("lj", "љ"), ("Lj", "Љ"), ("LJ", "Љ"),
            ("nj", "њ"), ("Nj", "Њ"), ("NJ", "Њ")]

SINGLES = {
    "a": "а", "b": "б", "c": "ц", "č": "ч", "ć": "ћ", "d": "д", "đ": "ђ",
    "e": "е", "f": "ф", "g": "г", "h": "х", "i": "и", "j": "ј", "k": "к",
    "l": "л", "m": "м", "n": "н", "o": "о", "p": "п", "r": "р", "s": "с",
    "š": "ш", "t": "т", "u": "у", "v": "в", "z": "з", "ž": "ж",
}
SINGLES.update({k.upper(): v.upper() for k, v in SINGLES.items()})

# ASCII folding, as Serbian is habitually typed without diacritics online.
FOLD = {"č": "c", "ć": "c", "ž": "z", "š": "s", "đ": "dj",
        "Č": "C", "Ć": "C", "Ž": "Z", "Š": "S", "Đ": "Dj"}

IDENT = re.compile(r"^[A-Za-z_$-￿][\w$-￿]*$")


# Strudel names that are genuine synonyms of one another. Two of these sharing a
# single Serbian alias is correct rather than a collision, because they resolve
# to the same underlying function.
SYNONYMS = [
    {"s", "sound"},
    {"fast", "density"},
    {"slow", "sparsity"},
]


def same_synonym_group(a, b):
    return any(a in g and b in g for g in SYNONYMS)


def to_cyrillic(text):
    for lat, cyr in DIGRAPHS:
        text = text.replace(lat, cyr)
    return "".join(SINGLES.get(ch, ch) for ch in text)


def fold_ascii(text):
    return "".join(FOLD.get(ch, ch) for ch in text)


def as_list(v):
    return list(v) if isinstance(v, list) else [v]


def walk_aliases(section):
    """Yield (english_key, alias) for a dict section, skipping _note keys."""
    for k, v in section.items():
        if k.startswith("_"):
            continue
        for a in as_list(v):
            yield k, a


def expand_folded(section):
    """Add ASCII-folded variants alongside each diacritic alias."""
    out = {}
    for k, v in section.items():
        if k.startswith("_"):
            out[k] = v
            continue
        aliases = as_list(v)
        expanded = []
        for a in aliases:
            expanded.append(a)
            folded = fold_ascii(a)
            if folded != a and folded not in expanded:
                expanded.append(folded)
        out[k] = expanded
    return out


def cyrillicise(section):
    out = {}
    for k, v in section.items():
        if k.startswith("_"):
            out[k] = v
            continue
        # Cyrillic has no ASCII-folded form; transliterate the diacritic originals.
        out[k] = [to_cyrillic(a) for a in as_list(v)]
    return out


def validate(latn, canon, icelandic):
    errors, warnings = [], []
    fn = latn["functions"]

    # 1. English keys must be real Strudel names
    if canon:
        for k in fn:
            if k.startswith("_"):
                continue
            if k not in canon:
                errors.append(f"[1] function key '{k}' is not a registered Strudel name")

    # 2 + 3. collisions
    claimed = {}
    for section in ("functions", "colors", "sounds", "scales"):
        for k, alias in walk_aliases(latn.get(section, {})):
            key = (section, alias.lower())
            if canon and section == "functions" and alias in canon:
                errors.append(f"[2] alias '{alias}' (for {k}) shadows Strudel's own '{alias}'")
            if key in claimed and claimed[key] != k and not same_synonym_group(claimed[key], k):
                errors.append(
                    f"[3] alias '{alias}' claimed by both '{claimed[key]}' and '{k}' in {section}")
            claimed[key] = k

    # 5. identifier validity (function aliases become real method names)
    for k, alias in walk_aliases(fn):
        if not IDENT.match(alias):
            errors.append(f"[5] alias '{alias}' (for {k}) is not a valid JS identifier")
        if not IDENT.match(to_cyrillic(alias)):
            errors.append(f"[5] Cyrillic '{to_cyrillic(alias)}' (for {k}) is not a valid identifier")

    # 4. parity with the Icelandic reference dialect
    if icelandic:
        is_fn = {k for k in icelandic.get("functions", {}) if not k.startswith("_")}
        ours = {k for k in fn if not k.startswith("_")}
        missing = sorted(is_fn - ours)
        if missing:
            warnings.append(
                f"[4] {len(missing)} function(s) Icelandic covers and Serbian does not: "
                + ", ".join(missing))
        extra = sorted(ours - is_fn)
        if extra:
            warnings.append(f"[4] {len(extra)} beyond the Icelandic set (fine — Strudla is larger)")
    return errors, warnings


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--canon", default=None, help="newline-separated canonical Strudel names")
    ap.add_argument("--icelandic", default=None, help="is.json reference locale")
    args = ap.parse_args()

    latn = json.loads((ROOT / "locales" / "sr-latn.json").read_text(encoding="utf-8"))

    canon = None
    if args.canon and Path(args.canon).exists():
        canon = {l.strip() for l in Path(args.canon).read_text(encoding="utf-8").splitlines() if l.strip()}
    icelandic = None
    if args.icelandic and Path(args.icelandic).exists():
        icelandic = json.loads(Path(args.icelandic).read_text(encoding="utf-8"))

    errors, warnings = validate(latn, canon, icelandic)
    for w in warnings:
        print("WARN  " + w)
    for e in errors:
        print("ERROR " + e)
    if errors:
        print(f"\n{len(errors)} error(s) — build aborted.")
        return 1

    # ---- generate the two shipped locales --------------------------------
    latn_out = dict(latn)
    for sec in ("functions", "colors", "sounds", "scales", "notes"):
        if sec in latn_out:
            latn_out[sec] = expand_folded(latn_out[sec])

    cyrl = dict(latn)
    cyrl["code"] = "sr-cyrl"
    cyrl["name"] = "Strudla — српски (ћирилица)"
    for sec in ("functions", "colors", "sounds", "scales", "notes"):
        if sec in cyrl:
            cyrl[sec] = cyrillicise(latn[sec])
    cyrl["constants"] = {to_cyrillic(k): v for k, v in latn["constants"].items()}

    (ROOT / "locales" / "sr-cyrl.json").write_text(
        json.dumps(cyrl, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    # ---- emit dist/strudla.js -------------------------------------------
    tpl = (ROOT / "tools" / "strudla.template.js").read_text(encoding="utf-8")
    js = tpl.replace("/*__SR_LATN__*/null",
                     json.dumps(latn_out, ensure_ascii=False)) \
            .replace("/*__SR_CYRL__*/null",
                     json.dumps(cyrl, ensure_ascii=False))
    (ROOT / "dist" / "strudla.js").write_text(js, encoding="utf-8")

    n_fn = len([k for k in latn["functions"] if not k.startswith("_")])
    n_alias = sum(len(as_list(v)) for k, v in latn_out["functions"].items() if not k.startswith("_"))
    print(f"\nOK  {n_fn} functions -> {n_alias} Latin aliases (incl. ASCII-folded)")
    print(f"OK  locales/sr-cyrl.json written")
    print(f"OK  dist/strudla.js written ({(ROOT / 'dist' / 'strudla.js').stat().st_size} bytes)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
