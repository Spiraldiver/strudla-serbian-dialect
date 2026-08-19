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

const SR_LATN = {"code": "sr-latn", "name": "Štrudla — srpski (latinica)", "direction": "ltr", "_note": "Canonical source. Proper Serbian orthography with diacritics. tools/build.py generates the ASCII-folded aliases (požuri -> pozuri) and the full Cyrillic locale from this file — do not hand-maintain those.", "functions": {"s": ["zvuk", "z"], "sound": ["zvuk", "z"], "note": ["nota"], "n": ["broj"], "freq": ["frekvencija", "frek"], "fast": ["brzo"], "slow": ["sporo"], "hurry": ["požuri", "pozuri"], "rev": ["unazad"], "palindrome": ["palindrom"], "iter": ["smenjuj"], "every": ["svaki"], "when": ["kada"], "whenKey": ["kadaTaster"], "sometimes": ["ponekad"], "sometimesBy": ["ponekadSa"], "always": ["uvek"], "never": ["nikad"], "almostAlways": ["skoroUvek"], "almostNever": ["skoroNikad"], "someCycles": ["nekiCiklusi"], "cat": ["nizanje", "spajanje"], "slowcat": ["sporoNizanje"], "fastcat": ["brzoNizanje"], "stack": ["slog", "naslaži", "naslazi"], "arrange": ["aranžman", "aranzman"], "timeCat": ["vremenskiNiz"], "sequence": ["sekvenca"], "seq": ["sled"], "struct": ["struktura"], "mask": ["maska"], "euclid": ["euklid"], "euclidRot": ["euklidRot"], "segment": ["odsečak", "odsecak"], "range": ["opseg"], "chop": ["seckaj"], "striate": ["pruge", "isprugaj"], "slice": ["kriška", "kriska"], "splice": ["spoji"], "ply": ["umnoži", "umnozi"], "chunk": ["deo"], "fastChunk": ["brziDeo"], "fastGap": ["brziRazmak"], "linger": ["zadrži", "zadrzi"], "inside": ["unutra"], "outside": ["spolja"], "compress": ["sabij"], "expand": ["raširi", "rasiri"], "extend": ["produži", "produzi"], "zoom": ["uveličaj", "uvelicaj", "zum"], "take": ["uzmi"], "spread": ["rasprostri"], "scramble": ["izmešaj", "izmesaj"], "shuffle": ["promešaj", "promesaj"], "degrade": ["razgradi"], "degradeBy": ["razgradiSa"], "press": ["pritisni"], "off": ["pomak"], "jux": ["razdvoji"], "superimpose": ["preklopi"], "layer": ["sloj"], "echo": ["odjek"], "echoWith": ["odjekSa"], "brak": ["prelom"], "add": ["dodaj"], "sub": ["oduzmi"], "mul": ["pomnoži", "pomnozi"], "div": ["podeli"], "floor": ["zaokružiDole", "zaokruziDole"], "round": ["zaokruži", "zaokruzi"], "choose": ["biraj"], "filter": ["propusnik"], "filterValues": ["filtrirajVrednosti"], "filterWhen": ["filtrirajKada"], "gain": ["jačina", "jacina", "glasnoća", "glasnoca"], "velocity": ["dinamika"], "amp": ["pojačanje", "pojacanje"], "pan": ["panorama", "pomeraj"], "speed": ["brzina"], "accelerate": ["ubrzanje", "gas"], "begin": ["početak", "pocetak"], "end": ["kraj"], "clip": ["skrati"], "cut": ["preseci"], "bank": ["banka"], "orbit": ["orbita"], "lpf": ["niskopropusni", "npf"], "hpf": ["visokopropusni", "vpf"], "bpf": ["pojasni", "ppf"], "cutoff": ["prag", "odsecanje"], "resonance": ["rezonanca"], "vowel": ["samoglasnik"], "crush": ["drobi", "zdrobi"], "coarse": ["grubo"], "distort": ["izobliči", "izoblici", "izobličenje", "izoblicenje"], "shape": ["oblik"], "squiz": ["stisni"], "compressor": ["kompresor"], "attack": ["napad"], "decay": ["opadanje"], "sustain": ["održanje", "odrzanje"], "release": ["otpuštanje", "otpustanje"], "adsr": ["omotač", "omotac"], "room": ["soba", "prostor"], "size": ["veličina", "velicina"], "delay": ["kašnjenje", "kasnjenje", "odloži", "odlozi"], "delaytime": ["vremeKašnjenja", "vremeKasnjenja"], "delayfeedback": ["povratnaSprega"], "delaysync": ["sinhroKašnjenja", "sinhroKasnjenja"], "detune": ["raštimuj", "rastimuj"], "scale": ["lestvica", "skala"], "arp": ["razlaganje", "arpeđo", "arpedjo"], "arpWith": ["razlaganjeSa"], "transpose": ["transponuj"], "color": ["boja"], "often": ["često", "cesto"], "rarely": ["retko"], "someCyclesBy": ["nekiCiklusiSa"], "firstOf": ["prviOd"], "lastOf": ["poslednjiOd"], "iterBack": ["smenjujUnazad"], "chunkBack": ["deoUnazad"], "juxBy": ["razdvojiSa"], "early": ["ranije"], "late": ["kasnije"], "swing": ["njihanje"], "swingBy": ["njihanjeSa"], "squeeze": ["utisni"], "stut": ["mucanje"], "undegrade": ["obnovi"], "undegradeBy": ["obnoviSa"], "invert": ["izokreni"], "pace": ["korak"], "density": ["gustina"], "drop": ["izbaci"], "grow": ["rasti"], "shrink": ["skupi"], "contract": ["stegni"], "fit": ["uklopi"], "pick": ["odaberi"], "ceil": ["zaokružiGore", "zaokruziGore"], "pow": ["stepen"], "euclidLegato": ["euklidLegato"], "range2": ["opseg2"], "rangex": ["opsegX"], "loop": ["petlja"], "loopAt": ["petljaNa"], "loopBegin": ["petljaPočetak", "petljaPocetak"], "loopEnd": ["petljaKraj"], "slide": ["klizanje"], "duration": ["trajanje"], "offset": ["odmak"], "anchor": ["sidro"], "vib": ["drhtaj"], "vibmod": ["drhtajDubina"], "phaser": ["fejzer"], "dry": ["suvo"], "postgain": ["naknadnaJačina", "naknadnaJacina"], "roomsize": ["veličinaSobe", "velicinaSobe"], "rsize": ["veličinaProstora", "velicinaProstora"], "noise": ["šum", "sum"], "dist": ["distorzija"], "chord": ["akord"], "voicing": ["raspored"], "voicings": ["rasporedi"], "tune": ["naštimuj", "nastimuj"], "scaleTranspose": ["transponujULestvici"], "rootNotes": ["osnovniTonovi"], "mode": ["način", "nacin"], "ftype": ["tipFiltera"], "lpq": ["npfRezonanca"], "hpq": ["vpfRezonanca"], "bpq": ["ppfRezonanca"], "lpenv": ["npfOmotač", "npfOmotac"], "hpenv": ["vpfOmotač", "vpfOmotac"], "bpenv": ["ppfOmotač", "ppfOmotac"], "lpa": ["npfNapad"], "lpd": ["npfOpadanje"], "lps": ["npfOdržanje", "npfOdrzanje"], "lpr": ["npfOtpuštanje", "npfOtpustanje"], "pianoroll": ["klavirskaTraka"], "scrub": ["premotaj"], "sine": ["sinus"], "cosine": ["kosinus"], "saw": ["pila"], "isaw": ["obrnutaPila"], "tri": ["trougaoni"], "square": ["kvadratni"], "rand": ["slučajno", "slucajno"], "irand": ["slučajnoCelo", "slucajnoCelo"], "run": ["niz"], "cpm": ["ciklusaUMinuti", "ckm"], "setcpm": ["postaviCkm"], "setcps": ["postaviCps"], "hush": ["utišaj", "utisaj", "tiho"], "silence": ["tišina", "tisina"]}, "colors": {"red": ["crvena"], "green": ["zelena"], "blue": ["plava"], "yellow": ["žuta", "zuta"], "cyan": ["cijan", "plavozelena"], "magenta": ["magenta", "purpurna"], "black": ["crna"], "white": ["bela"], "gray": ["siva"], "orange": ["narandžasta", "narandzasta"], "pink": ["roze", "ružičasta", "ruzicasta"], "purple": ["ljubičasta", "ljubicasta"], "brown": ["braon", "smeđa", "smedja"]}, "sounds": {"bd": ["bubanj", "veliki"], "sd": ["doboš", "dobos"], "hh": ["hihet", "činela", "cinela"], "oh": ["otvorenaČinela", "otvorenaCinela"], "cp": ["pljesak"], "rim": ["obod"], "cr": ["kraš", "kras"], "rd": ["rajd"], "lt": ["niskiTom"], "mt": ["srednjiTom"], "ht": ["visokiTom"], "perc": ["udaraljka"], "piano": ["klavir"], "sawtooth": ["testera"], "square": ["kvadrat"], "triangle": ["trougao"], "sine": ["sinus"]}, "scales": {"major": ["dur"], "minor": ["mol"], "harmonicMinor": ["harmonskiMol"], "melodicMinor": ["melodskiMol"], "majorPentatonic": ["durskaPentatonika"], "minorPentatonic": ["molskaPentatonika"], "chromatic": ["hromatska"], "wholetone": ["celostepena"], "dorian": ["dorska"], "phrygian": ["frigijska"], "lydian": ["lidijska"], "mixolydian": ["miksolidijska"], "aeolian": ["eolska"], "locrian": ["lokrijska"], "blues": ["bluz"], "_multiword": "Multi-word tonal scales are written with colons in mini (c:phrygian:dominant); token-wise translation composes them, so each WORD needs its own entry.", "dominant": ["dominantna"], "harmonic": ["harmonska"], "hungarian": ["mađarska", "madjarska"], "double": ["dvostruka"], "neapolitan": ["napuljska"], "gypsy": ["ciganska"], "byzantine": ["vizantijska"], "oriental": ["orijentalna"], "persian": ["persijska"], "todi": ["todi"], "augmented": ["uvećana", "uvecana"], "diminished": ["umanjena"]}, "notes": {"_note": "Serbian follows the Germanic convention: H is B-natural, B is B-flat. Off by default — enable with initStrudla({ note: true }), since it shadows the standard b.", "b": ["h"]}, "constants": {"dno": 50, "gornjeDno": 120, "donjaSredina": 300, "sredina": 1000, "gornjaSredina": 2000, "donjiVrh": 5000, "vrh": 10000, "gornjiVrh": 16000}};
const SR_CYRL = {"code": "sr-cyrl", "name": "Strudla — српски (ћирилица)", "direction": "ltr", "_note": "Canonical source. Proper Serbian orthography with diacritics. tools/build.py generates the ASCII-folded aliases (požuri -> pozuri) and the full Cyrillic locale from this file — do not hand-maintain those.", "functions": {"s": ["звук", "з"], "sound": ["звук", "з"], "note": ["нота"], "n": ["број"], "freq": ["фреквенција", "фрек"], "fast": ["брзо"], "slow": ["споро"], "hurry": ["пожури"], "rev": ["уназад"], "palindrome": ["палиндром"], "iter": ["смењуј"], "every": ["сваки"], "when": ["када"], "whenKey": ["кадаТастер"], "sometimes": ["понекад"], "sometimesBy": ["понекадСа"], "always": ["увек"], "never": ["никад"], "almostAlways": ["скороУвек"], "almostNever": ["скороНикад"], "someCycles": ["некиЦиклуси"], "cat": ["низање", "спајање"], "slowcat": ["спороНизање"], "fastcat": ["брзоНизање"], "stack": ["слог", "наслажи"], "arrange": ["аранжман"], "timeCat": ["временскиНиз"], "sequence": ["секвенца"], "seq": ["след"], "struct": ["структура"], "mask": ["маска"], "euclid": ["еуклид"], "euclidRot": ["еуклидРот"], "segment": ["одсечак"], "range": ["опсег"], "chop": ["сецкај"], "striate": ["пруге", "испругај"], "slice": ["кришка"], "splice": ["споји"], "ply": ["умножи"], "chunk": ["део"], "fastChunk": ["брзиДео"], "fastGap": ["брзиРазмак"], "linger": ["задржи"], "inside": ["унутра"], "outside": ["споља"], "compress": ["сабиј"], "expand": ["рашири"], "extend": ["продужи"], "zoom": ["увеличај", "зум"], "take": ["узми"], "spread": ["распростри"], "scramble": ["измешај"], "shuffle": ["промешај"], "degrade": ["разгради"], "degradeBy": ["разградиСа"], "press": ["притисни"], "off": ["помак"], "jux": ["раздвоји"], "superimpose": ["преклопи"], "layer": ["слој"], "echo": ["одјек"], "echoWith": ["одјекСа"], "brak": ["прелом"], "add": ["додај"], "sub": ["одузми"], "mul": ["помножи"], "div": ["подели"], "floor": ["заокружиДоле"], "round": ["заокружи"], "choose": ["бирај"], "filter": ["пропусник"], "filterValues": ["филтрирајВредности"], "filterWhen": ["филтрирајКада"], "gain": ["јачина", "гласноћа"], "velocity": ["динамика"], "amp": ["појачање"], "pan": ["панорама", "померај"], "speed": ["брзина"], "accelerate": ["убрзање", "гас"], "begin": ["почетак"], "end": ["крај"], "clip": ["скрати"], "cut": ["пресеци"], "bank": ["банка"], "orbit": ["орбита"], "lpf": ["нископропусни", "нпф"], "hpf": ["високопропусни", "впф"], "bpf": ["појасни", "ппф"], "cutoff": ["праг", "одсецање"], "resonance": ["резонанца"], "vowel": ["самогласник"], "crush": ["дроби", "здроби"], "coarse": ["грубо"], "distort": ["изобличи", "изобличење"], "shape": ["облик"], "squiz": ["стисни"], "compressor": ["компресор"], "attack": ["напад"], "decay": ["опадање"], "sustain": ["одржање"], "release": ["отпуштање"], "adsr": ["омотач"], "room": ["соба", "простор"], "size": ["величина"], "delay": ["кашњење", "одложи"], "delaytime": ["времеКашњења"], "delayfeedback": ["повратнаСпрега"], "delaysync": ["синхроКашњења"], "detune": ["раштимуј"], "scale": ["лествица", "скала"], "arp": ["разлагање", "арпеђо"], "arpWith": ["разлагањеСа"], "transpose": ["транспонуј"], "color": ["боја"], "often": ["често"], "rarely": ["ретко"], "someCyclesBy": ["некиЦиклусиСа"], "firstOf": ["првиОд"], "lastOf": ["последњиОд"], "iterBack": ["смењујУназад"], "chunkBack": ["деоУназад"], "juxBy": ["раздвојиСа"], "early": ["раније"], "late": ["касније"], "swing": ["њихање"], "swingBy": ["њихањеСа"], "squeeze": ["утисни"], "stut": ["муцање"], "undegrade": ["обнови"], "undegradeBy": ["обновиСа"], "invert": ["изокрени"], "pace": ["корак"], "density": ["густина"], "drop": ["избаци"], "grow": ["расти"], "shrink": ["скупи"], "contract": ["стегни"], "fit": ["уклопи"], "pick": ["одабери"], "ceil": ["заокружиГоре"], "pow": ["степен"], "euclidLegato": ["еуклидЛегато"], "range2": ["опсег2"], "rangex": ["опсегX"], "loop": ["петља"], "loopAt": ["петљаНа"], "loopBegin": ["петљаПочетак"], "loopEnd": ["петљаКрај"], "slide": ["клизање"], "duration": ["трајање"], "offset": ["одмак"], "anchor": ["сидро"], "vib": ["дрхтај"], "vibmod": ["дрхтајДубина"], "phaser": ["фејзер"], "dry": ["суво"], "postgain": ["накнаднаЈачина"], "roomsize": ["величинаСобе"], "rsize": ["величинаПростора"], "noise": ["шум"], "dist": ["дисторзија"], "chord": ["акорд"], "voicing": ["распоред"], "voicings": ["распореди"], "tune": ["наштимуј"], "scaleTranspose": ["транспонујУЛествици"], "rootNotes": ["основниТонови"], "mode": ["начин"], "ftype": ["типФилтера"], "lpq": ["нпфРезонанца"], "hpq": ["впфРезонанца"], "bpq": ["ппфРезонанца"], "lpenv": ["нпфОмотач"], "hpenv": ["впфОмотач"], "bpenv": ["ппфОмотач"], "lpa": ["нпфНапад"], "lpd": ["нпфОпадање"], "lps": ["нпфОдржање"], "lpr": ["нпфОтпуштање"], "pianoroll": ["клавирскаТрака"], "scrub": ["премотај"], "sine": ["синус"], "cosine": ["косинус"], "saw": ["пила"], "isaw": ["обрнутаПила"], "tri": ["троугаони"], "square": ["квадратни"], "rand": ["случајно"], "irand": ["случајноЦело"], "run": ["низ"], "cpm": ["циклусаУМинути", "цкм"], "setcpm": ["поставиЦкм"], "setcps": ["поставиЦпс"], "hush": ["утишај", "тихо"], "silence": ["тишина"]}, "colors": {"red": ["црвена"], "green": ["зелена"], "blue": ["плава"], "yellow": ["жута"], "cyan": ["цијан", "плавозелена"], "magenta": ["магента", "пурпурна"], "black": ["црна"], "white": ["бела"], "gray": ["сива"], "orange": ["наранџаста"], "pink": ["розе", "ружичаста"], "purple": ["љубичаста"], "brown": ["браон", "смеђа"]}, "sounds": {"bd": ["бубањ", "велики"], "sd": ["добош"], "hh": ["хихет", "чинела"], "oh": ["отворенаЧинела"], "cp": ["пљесак"], "rim": ["обод"], "cr": ["краш"], "rd": ["рајд"], "lt": ["нискиТом"], "mt": ["средњиТом"], "ht": ["високиТом"], "perc": ["удараљка"], "piano": ["клавир"], "sawtooth": ["тестера"], "square": ["квадрат"], "triangle": ["троугао"], "sine": ["синус"]}, "scales": {"major": ["дур"], "minor": ["мол"], "harmonicMinor": ["хармонскиМол"], "melodicMinor": ["мелодскиМол"], "majorPentatonic": ["дурскаПентатоника"], "minorPentatonic": ["молскаПентатоника"], "chromatic": ["хроматска"], "wholetone": ["целостепена"], "dorian": ["дорска"], "phrygian": ["фригијска"], "lydian": ["лидијска"], "mixolydian": ["миксолидијска"], "aeolian": ["еолска"], "locrian": ["локријска"], "blues": ["блуз"], "_multiword": "Multi-word tonal scales are written with colons in mini (c:phrygian:dominant); token-wise translation composes them, so each WORD needs its own entry.", "dominant": ["доминантна"], "harmonic": ["хармонска"], "hungarian": ["мађарска"], "double": ["двострука"], "neapolitan": ["напуљска"], "gypsy": ["циганска"], "byzantine": ["византијска"], "oriental": ["оријентална"], "persian": ["персијска"], "todi": ["тоди"], "augmented": ["увећана"], "diminished": ["умањена"]}, "notes": {"_note": "Serbian follows the Germanic convention: H is B-natural, B is B-flat. Off by default — enable with initStrudla({ note: true }), since it shadows the standard b.", "b": ["х"]}, "constants": {"дно": 50, "горњеДно": 120, "доњаСредина": 300, "средина": 1000, "горњаСредина": 2000, "доњиВрх": 5000, "врх": 10000, "горњиВрх": 16000}};

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
