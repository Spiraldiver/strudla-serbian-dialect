#!/usr/bin/env python3
"""Extract every public Strudel name from a Strudel source tree.

Strudel names arrive three different ways, and a naive grep for register('x')
misses two of them:

    export const fast = register('fast', ...)          # plain
    register(['fast', 'density'], ...)                 # name + synonyms
    export const { s, sound } = registerControl([...]) # destructured control

Usage:
    python tools/extract_canonical.py <strudel-repo> [-o out.txt]
"""
import argparse
import re
from pathlib import Path

STR = r"""['"]([A-Za-z_$][\w$]*)['"]"""
RE_REGISTER_STR = re.compile(r"\bregister(?:Control|Sound)?\(\s*" + STR)
RE_REGISTER_ARR = re.compile(r"\bregister(?:Control|Sound)?\(\s*\[([^\]]*)\]")
RE_DESTRUCTURED = re.compile(
    r"export\s+const\s*\{([^}]*)\}\s*=\s*register(?:Control|Sound)?\b")
RE_CONST_EXPORT = re.compile(
    r"export\s+const\s+([A-Za-z_$][\w$]*)\s*=\s*register(?:Control|Sound)?\b")
RE_IDENT_IN_STR = re.compile(STR)
RE_IDENT = re.compile(r"[A-Za-z_$][\w$]*")

# Not everything goes through register(). Two more shapes carry public names:
#   export const add = curry(...)        plain function export
#   class Pattern { layer(...funcs) {} } method on the Pattern prototype
RE_PLAIN_EXPORT = re.compile(
    r"export\s+(?:const|function)\s+([A-Za-z_$][\w$]*)\s*[=(]")
RE_EXPORT_LIST = re.compile(r"export\s*\{([^}]*)\}")
RE_CLASS_METHOD = re.compile(r"^\s{2}([A-Za-z_$][\w$]*)\s*\(", re.MULTILINE)
# COMPOSERS/arithmetic tables register a family of ops from their keys
RE_TABLE_KEY = re.compile(r"^\s{2}([a-z][\w$]*):\s*\[", re.MULTILINE)


def extract(root: Path):
    names = set()
    files = [p for p in root.glob("packages/*/*.mjs")
             if "node_modules" not in p.parts and not p.name.endswith(".test.mjs")]
    for p in files:
        try:
            src = p.read_text(encoding="utf-8", errors="ignore")
        except OSError:
            continue
        for m in RE_REGISTER_STR.finditer(src):
            names.add(m.group(1))
        for m in RE_REGISTER_ARR.finditer(src):
            names.update(RE_IDENT_IN_STR.findall(m.group(1)))
        for m in RE_DESTRUCTURED.finditer(src):
            names.update(RE_IDENT.findall(m.group(1)))
        for m in RE_CONST_EXPORT.finditer(src):
            names.add(m.group(1))
        for m in RE_PLAIN_EXPORT.finditer(src):
            names.add(m.group(1))
        for m in RE_EXPORT_LIST.finditer(src):
            names.update(RE_IDENT.findall(m.group(1)))
        # Pattern class methods only — other classes are internal
        if p.name in ("pattern.mjs", "signal.mjs"):
            for m in RE_CLASS_METHOD.finditer(src):
                names.add(m.group(1))
            for m in RE_TABLE_KEY.finditer(src):
                names.add(m.group(1))
    # drop obvious non-API noise picked up by the broad patterns
    noise = {"if", "for", "while", "switch", "catch", "return", "function",
             "constructor", "default", "from", "as", "get", "set", "typeof"}
    return {n for n in names if n not in noise and not n.startswith("_")}, len(files)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("root")
    ap.add_argument("-o", "--out", default="tools/strudel_canonical.txt")
    a = ap.parse_args()

    names, nfiles = extract(Path(a.root))
    # a few names live in the REPL eval scope rather than a register() call
    names.update({"silence", "hush", "all", "stack", "cat", "seq", "mini", "pure",
                  "run", "irand", "rand", "perlin", "sine", "saw", "square", "tri",
                  "isaw", "cosine", "setcps", "setcpm", "samples", "sound", "s"})
    Path(a.out).write_text("\n".join(sorted(names)) + "\n", encoding="utf-8")
    print(f"scanned {nfiles} files -> {len(names)} canonical names -> {a.out}")


if __name__ == "__main__":
    main()
