// Strudla — srpski dijalekt za Strudel  /  Serbian dialect for Strudel
// https://github.com/Spiraldiver/strudla-serbian-dialect                License: AGPL-3.0
//
// Loads into strudel.cc with a plain dynamic import and no changes to Strudel:
//
//   await import('https://spiraldiver.github.io/strudla-serbian-dialect/dist/strudla.js')
//
// Strudel's transpiler does not rewrite import expressions, so this is ordinary
// JavaScript. The module installs itself on import — importing IS the setup.
//
// GENERATED FILE — edit locales/sr-latn.json and run tools/build.py instead.

const SR_LATN = /*__SR_LATN__*/null;
const SR_CYRL = /*__SR_CYRL__*/null;

const LOCALES = { 'sr-latn': SR_LATN, 'sr': SR_LATN, 'sr-cyrl': SR_CYRL, 'cyr': SR_CYRL };

// Every alias actually installed, so exportAliases()/strudlaInfo() report what
// is genuinely live rather than what the dictionary hoped for.
const installed = { functions: new Map(), sounds: new Map(), scales: new Map(), colors: new Map() };
let patternProto = null;
let active = [];

const asList = (v) => (Array.isArray(v) ? v : [v]);
const isWord = (k) => !String(k).startsWith('_');

// Strudel exposes its API on globalThis for the REPL eval scope, which is how
// any external module reaches it. The Pattern prototype is reached through a
// known pattern instance rather than an import, so this file stays dependency
// free and version agnostic.
function findPatternProto() {
  if (patternProto) return patternProto;
  for (const probe of ['silence', 'pure', 'mini', 's', 'note']) {
    const g = globalThis[probe];
    try {
      const p = typeof g === 'function' ? g('bd') : g;
      if (p && typeof p.queryArc === 'function') {
        patternProto = Object.getPrototypeOf(p);
        return patternProto;
      }
    } catch { /* probe failed, try the next one */ }
  }
  return null;
}

function aliasFunction(canonical, alias) {
  let hit = false;
  // Global form: zvuk("bd"). Note the check is `!== undefined`, not
  // `typeof === 'function'` — several Strudel globals are Pattern VALUES rather
  // than functions (sine, cosine, saw, tri, square, rand, perlin, silence).
  // Testing for a function silently skipped every one of them.
  if (globalThis[canonical] !== undefined && globalThis[alias] === undefined) {
    globalThis[alias] = globalThis[canonical];
    hit = true;
  }
  // method form:  zvuk("bd").brzo(2)
  const proto = findPatternProto();
  if (proto) {
    const desc = Object.getOwnPropertyDescriptor(proto, canonical);
    if (desc && !Object.getOwnPropertyDescriptor(proto, alias)) {
      Object.defineProperty(proto, alias, desc);
      hit = true;
    }
  }
  if (hit) installed.functions.set(alias, canonical);
  return hit;
}

// Sound/scale names are string VALUES, not identifiers, so they are translated
// by wrapping the function that consumes them rather than by defining a method.
function buildValueMap(section) {
  const map = new Map();
  for (const [en, aliases] of Object.entries(section || {})) {
    if (!isWord(en)) continue;
    for (const a of asList(aliases)) map.set(String(a).toLowerCase(), en);
  }
  return map;
}

function translateTokens(str, map) {
  // Rewrite only bare words, leaving mini-notation punctuation
  // (* / ! @ < > [ ] { } , ~ .) and :indices untouched. Splitting on word
  // boundaries also handles both colon conventions for free: "bubanj:2"
  // (sample:index, translate the head) and "c:dur" (root:scale, translate the
  // tail) each come out right without special casing.
  return String(str).replace(/[\p{L}\p{M}\w]+/gu, (tok) => map.get(tok.toLowerCase()) ?? tok);
}

// Strudel's transpiler rewrites every double-quoted string in the REPL into a
// mini() call BEFORE the control runs. So s("bubanj doboš") never receives a
// string — it receives a Pattern whose hap values are the words. Translating
// only raw strings therefore silently does nothing in the real REPL, which is
// exactly how untranslated names reach the audio engine. Handle both.
function translateValue(v, map) {
  if (typeof v === 'string') return translateTokens(v, map);
  // Mini parses "c:mol" into an ARRAY ['c','mol'] — scale() then does
  // scale.flat().join(' ') internally. Skipping arrays meant scale names were
  // never translated and tonal saw the untranslated word.
  if (Array.isArray(v)) return v.map((x) => translateValue(x, map));
  if (v && typeof v === 'object') {
    let out = null;
    for (const k of ['s', 'sound', 'value', 'scale', 'bank']) {
      if (typeof v[k] === 'string') {
        const t = translateTokens(v[k], map);
        if (t !== v[k]) (out ??= { ...v })[k] = t;
      }
    }
    return out ?? v;
  }
  return v;
}

function translateArg(a, map) {
  if (typeof a === 'string') return translateTokens(a, map);
  // a Pattern — map the translation over its values
  if (a && typeof a === 'object') {
    if (typeof a.fmap === 'function') return a.fmap((v) => translateValue(v, map));
    if (typeof a.withValue === 'function') return a.withValue((v) => translateValue(v, map));
  }
  return a;
}

// Shared, accumulating translation tables. They must be module level and
// mutable: loading a second locale (e.g. Cyrillic after Latin) finds s()
// already wrapped, so the new words have to land in the map the existing
// wrapper already closes over rather than in a fresh one that nothing reads.
const VALUE_MAPS = { sound: new Map(), scale: new Map() };

function wrapValueFn(name, mapKey, aliasNames) {
  const map = VALUE_MAPS[mapKey];
  const orig = globalThis[name];
  if (typeof orig !== 'function') return;

  // Already wrapped by an earlier locale — the shared map now holds the new
  // words, so only the aliases of this locale still need binding.
  if (orig.__strudla) {
    for (const a of aliasNames) if (globalThis[a] === undefined) globalThis[a] = orig;
    return;
  }

  const wrapped = function (...args) {
    if (args.length) args[0] = translateArg(args[0], map);
    return orig.apply(this, args);
  };
  wrapped.__strudla = true;
  Object.setPrototypeOf(wrapped, orig);
  Object.assign(wrapped, orig);
  globalThis[name] = wrapped;
  // Rebind aliases too. An alias already pointing at the ORIGINAL must be moved
  // onto the wrapper, otherwise zvuk("bubanj") would bypass the translation.
  for (const a of aliasNames) {
    if (globalThis[a] === undefined || globalThis[a] === orig) globalThis[a] = wrapped;
  }

  // keep the Pattern method in step, so .zvuk("bubanj") translates too
  const proto = findPatternProto();
  if (proto && typeof proto[name] === 'function' && !proto[name].__strudla) {
    const m = proto[name];
    const mw = function (...args) {
      if (args.length) args[0] = translateArg(args[0], map);
      return m.apply(this, args);
    };
    mw.__strudla = true;
    proto[name] = mw;
  }
}

function applyLocale(dict) {
  let n = 0;

  // Value translation MUST be installed before the function aliases, so that
  // aliasFunction copies the wrapped s()/scale() rather than the originals.
  for (const [a, en] of buildValueMap(dict.sounds)) {
    VALUE_MAPS.sound.set(a, en);
    installed.sounds.set(a, en);
  }
  for (const [a, en] of buildValueMap(dict.scales)) {
    VALUE_MAPS.scale.set(a, en);
    installed.scales.set(a, en);
  }

  if (VALUE_MAPS.sound.size) {
    const soundAliases = asList((dict.functions || {}).s || []).concat(
      asList((dict.functions || {}).sound || []));
    wrapValueFn('s', 'sound', soundAliases);
    wrapValueFn('sound', 'sound', soundAliases);
  }
  if (VALUE_MAPS.scale.size) {
    wrapValueFn('scale', 'scale', asList((dict.functions || {}).scale || []));
  }

  for (const [en, aliases] of Object.entries(dict.functions || {})) {
    if (!isWord(en)) continue;
    for (const a of asList(aliases)) if (aliasFunction(en, a)) n++;
  }

  for (const [en, aliases] of Object.entries(dict.colors || {})) {
    if (!isWord(en)) continue;
    for (const a of asList(aliases)) {
      if (globalThis[a] === undefined) globalThis[a] = en;
      installed.colors.set(a, en);
    }
  }

  for (const [name, value] of Object.entries(dict.constants || {})) {
    if (isWord(name) && globalThis[name] === undefined) globalThis[name] = value;
  }
  return n;
}

export async function initStrudla(options = {}) {
  const { locale = 'sr-latn', note = false, quiet = false } = options;
  const codes = asList(locale);
  let total = 0;
  for (const code of codes) {
    const dict = LOCALES[String(code).toLowerCase()];
    if (!dict) { console.warn(`[strudla] nepoznat lokalitet: ${code}`); continue; }
    total += applyLocale(dict);
    if (note && dict.notes) {
      for (const [en, aliases] of Object.entries(dict.notes)) {
        if (!isWord(en)) continue;
        for (const a of asList(aliases)) installed.functions.set(`note:${a}`, en);
      }
    }
    active.push(code);
  }
  if (!findPatternProto() && !quiet) {
    console.warn('[strudla] Pattern prototype nije pronađen — metode (.brzo) nisu instalirane. ' +
                 'Pokreni initStrudla() iz strudel.cc REPL-a.');
  }
  if (!quiet) {
    console.log(`[strudla] ${active.join(', ')} — ${total} psevdonima instalirano. ` +
                `Probaj: zvuk("bubanj doboš").brzo(2)`);
  }
  return strudlaInfo();
}

export function strudlaInfo() {
  return {
    active: [...active],
    functions: Object.fromEntries(installed.functions),
    sounds: Object.fromEntries(installed.sounds),
    scales: Object.fromEntries(installed.scales),
    colors: Object.fromEntries(installed.colors),
    counts: {
      functions: installed.functions.size,
      sounds: installed.sounds.size,
      scales: installed.scales.size,
      colors: installed.colors.size,
    },
  };
}

// English canonical for any Serbian word — the dictionary, in reverse.
export function recnik(word) {
  const w = String(word);
  return installed.functions.get(w)
      ?? installed.sounds.get(w.toLowerCase())
      ?? installed.scales.get(w.toLowerCase())
      ?? installed.colors.get(w.toLowerCase())
      ?? null;
}

globalThis.initStrudla = initStrudla;
globalThis.strudlaInfo = strudlaInfo;
globalThis.recnik = recnik;
globalThis.rečnik = recnik;

// ── self-install on import ─────────────────────────────────────────────────
// Importing the module is the whole setup step. Guarded so a second import
// (or a re-run of the same line) does not reinstall or re-log.
if (!globalThis.__strudlaLoaded) {
  globalThis.__strudlaLoaded = true;
  await initStrudla();
}

export { LOCALES };
export default initStrudla;
