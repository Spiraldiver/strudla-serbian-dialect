# Štrudla

**Srpski dijalekt za [Strudel](https://strudel.cc) — live coding na srpskom,
latinicom i ćirilicom.**

*A Serbian dialect for Strudel — live coding in Serbian, in both Latin and
Cyrillic script.*

## Primer / Primary example

**Balkanski 9/8 (2+2+2+3), 300 osmina u minuti, aranžman u 4 dela.**
Bubnjevi iz `samples_percs` crate-a, bas ulazi na 8. taktu i ostaje stabilan,
sintisajzer ima sopstveni aranžman u hidžazu (frigijska dominantna).

*Balkan 9/8 grouped 2+2+2+3 at 300 eighths per minute, arranged in four
sections. Drums from the `samples_percs` crate, bass enters at bar 8 and stays
stable, and the synth runs its own arrangement in hijaz (phrygian dominant).*

```js
await import('https://spiraldiver.github.io/strudla-serbian-dialect/dist/strudla.js')
samples('github:Spiraldiver/samples_percs')

postaviCkm(300/9)

const kik    = broj("<0 ~ ~ ~ 0 ~ ~ ~ ~>*9").zvuk("crate_bd").preseci(1).jačina(1.0)
const dobos  = broj("<~ ~ 0 ~ ~ ~ 0 ~ ~>*9").zvuk("crate_sd").preseci(2).jačina(0.62)
const hetovi = broj("<0 0 0 0 0 0 0 0 0>*9").zvuk("crate_hh").preseci(3)
  .jačina("0.9 0.35 0.7 0.35 0.7 0.35 0.9 0.35 0.35")
const perk   = broj("<~ ~ ~ ~ ~ ~ 0 ~ ~>*9").zvuk("crate_rd").preseci(4).jačina(0.44)

const filKik = broj("<~ ~ ~ ~ ~ ~ ~ 0 ~>*9").zvuk("crate_bd").preseci(5).jačina(0.7)
const filDob = broj("<~ ~ ~ ~ ~ ~ ~ 0 0>*9").zvuk("crate_sd").preseci(6).jačina(0.45)

const bas = nota("d2 ~ d2 ~ a1 ~ bb1 ~ ~")
  .zvuk("testera").niskopropusni(400).rezonanca(6).jačina(0.7)

const sint = nota("0 1 4 3 2 1 0 -3 [0 1]")
  .lestvica("d:frigijska:dominantna")
  .zvuk("testera")
  .niskopropusni(sinus.opseg(600, 3200)).rezonanca(14)
  .kašnjenje(0.3).sinhroKašnjenja(3/9)
  .soba(0.3).jačina(0.45)

const bubnjeviArr = aranžman(
  [4, slog(kik, hetovi)],
  [4, slog(kik, hetovi, dobos)],
  [4, slog(kik, hetovi, dobos, perk).poslednjiOd(4, x => slog(x, filDob))],
  [4, slog(kik, hetovi, dobos, perk).poslednjiOd(4, x => slog(x, filKik, filDob))]
)

const basArr = aranžman([8, tišina], [8, bas])

const sintArr = aranžman(
  [2, tišina],
  [2, sint],
  [2, sint.svaki(2, unazad)],
  [2, sint.smenjuj(3)],
  [2, sint.sporo(2)],
  [2, sint.razdvoji(unazad)],
  [2, sint.ponekadSa(0.5, x => x.sporo(2))],
  [2, sint.sporo(2).razdvoji(unazad)]
)

$: slog(bubnjeviArr, basArr, sintArr)
```

[▶ otvori u strudel.cc](https://strudel.cc) — zalepi kod gore, pa **play**.
Fajl: [`examples/balkan-9-8-aranzman.js`](examples/balkan-9-8-aranzman.js)

### Dva pravila koja drže ritam

1. **Sve je poravnato na 9.** Svaki obrazac ima tačno 9 koraka, a sve što uzima
   deo ciklusa (`smenjuj`, `sinhroKašnjenja`) mora da koristi delilac broja 9 —
   `3` ili `9`, nikad `2`, `4`, `8`, `16`. `smenjuj(4)` pomera za 2.25 koraka.
2. **Glas sa `preseci()` se nikad ne transformiše.** `često`, `ponekad`,
   `razdvoji` i `preklopi` slažu KOPIJU obrasca; kopija nosi isti broj grupe i
   preseca original, pa puls nestaje. Dopune idu na zaseban glas i zasebnu grupu.

*1. Everything is aligned to 9 — any argument taking a fraction of a cycle must
use a divisor of 9. 2. A voice with `preseci()` (cut) is never transformed:
`često`/`razdvoji` stack a copy, the copy carries the same cut group and kills
the original, and the pulse disappears.*

Ćirilica radi isto / Cyrillic works identically:

```js
звук("бубањ [~ добош] бубањ пљесак").брзо(2).јачина(0.8)
```

---

## Upotreba / Use

Jedna linija, običan dinamički `import`. Strudelov transpiler ne dira `import`
izraze, pa je ovo čist JavaScript — **nije potrebna nikakva izmena Strudela.**
Modul se sam instalira pri učitavanju: uvoz *jeste* podešavanje.

*One line, a plain dynamic `import`. Strudel's transpiler does not rewrite import
expressions, so this is ordinary JavaScript. The module installs itself on
import — importing IS the setup.*

```js
// jednom po sesiji / once per session
await import('https://spiraldiver.github.io/strudla-serbian-dialect/dist/strudla.js')
```

Rezervni URL-ovi / mirrors:

```js
await import('https://cdn.jsdelivr.net/gh/Spiraldiver/strudla-serbian-dialect@main/dist/strudla.js')
await import('https://cdn.statically.io/gh/Spiraldiver/strudla-serbian-dialect/main/dist/strudla.js')
```

> **Navodnici su bitni.** Strudelov transpiler pretvara **svaki dvostruko
> navedeni string** u mini-notaciju. URL nije validna mini-notacija, pa
> `import("https://…")` puca sa `[mini] parse error … but "/" found`.
> Koristi **jednostruke** navodnike za URL i za `locale`. Dvostruki ostaju za
> muzičke obrasce: `zvuk("bubanj doboš")`.
>
> *Quoting matters. Strudel's transpiler rewrites every double-quoted string into
> mini-notation. A URL isn't valid mini-notation, so `import("https://…")` fails
> with `[mini] parse error`. Use single quotes for the URL and for `locale`;
> double quotes stay for musical patterns.*

> `raw.githubusercontent.com` **ne radi** — servira `text/plain`, pa ga pregledač
> odbija kao modul. Mora GitHub Pages, jsDelivr ili Statically.
>
> jsDelivr agresivno kešira `@main` — ume da servira staru verziju satima.
> GitHub Pages je uvek svež; za jsDelivr zakači verziju (`@v0.2.1`).
> *jsDelivr caches `@main` hard and can serve a stale build for hours. Pages is
> always fresh; with jsDelivr, pin a tag.*

Posle prvog učitavanja radi i `await initStrudla()` direktno.

| poziv | šta radi |
|---|---|
| *(sam import)* | latinica, automatski |
| `initStrudla()` | latinica (podrazumevano) |
| `initStrudla({ locale: 'sr-cyrl' })` | ćirilica |
| `initStrudla({ locale: ['sr-latn','sr-cyrl'] })` | oba pisma odjednom |
| `initStrudla({ note: true })` | germansko `h` = H (vidi dole) |
| `strudlaInfo()` | spisak svih aktivnih psevdonima |
| `rečnik("brzo")` | `"fast"` — engleski original bilo koje srpske reči |

Srpski i engleski rade **istovremeno**. Strudla ništa ne uklanja — `s("bd").fast(2)`
i dalje radi normalno.

---

## Rečnik / Dictionary

**192 funkcije**, 261 psevdonim na latinici (uključujući verzije bez dijakritika),
plus zvuci, lestvice, signali, boje i konstante. Pokriva 69% Strudel imena koja
izlaže STOP.

### Osnovno

| Strudel | Strudla | latinica bez kvačica |
|---|---|---|
| `s` / `sound` | `zvuk`, `z` | |
| `note` | `nota` | |
| `fast` | `brzo` | |
| `slow` | `sporo` | |
| `rev` | `unazad` | |
| `every` | `svaki` | |
| `gain` | `jačina`, `glasnoća` | `jacina`, `glasnoca` |
| `room` | `soba`, `prostor` | |
| `delay` | `kašnjenje`, `odloži` | `kasnjenje`, `odlozi` |
| `scale` | `lestvica`, `skala` | |
| `stack` | `slog`, `naslaži` | `naslazi` |
| `cat` | `nizanje`, `spajanje` | |
| `jux` | `razdvoji` | |
| `chop` | `seckaj` | |
| `hush` | `utišaj`, `tiho` | `utisaj` |
| `sine` / `cosine` | `sinus`, `kosinus` | |
| `saw` / `tri` / `square` | `pila`, `trougaoni`, `kvadratni` | |
| `rand` | `slučajno` | `slucajno` |
| `often` / `rarely` | `često`, `retko` | `cesto` |
| `swing` / `stut` | `njihanje`, `mucanje` | |

Svaka reč sa dijakritikom ima i verziju bez njih, jer se srpski u praksi često
kuca bez kvačica. `jačina` i `jacina` su ista funkcija.

*Every diacritic word also has an ASCII-folded form, because Serbian is commonly
typed without diacritics. `jačina` and `jacina` are the same function.*

### Zvuci / Sounds

`bubanj` (bd) · `doboš` (sd) · `činela` / `hihet` (hh) · `pljesak` (cp) ·
`obod` (rim) · `kraš` (cr) · `rajd` (rd) · `udaraljka` (perc) · `klavir` (piano) ·
`testera` (sawtooth) · `kvadrat` (square) · `trougao` (triangle) · `sinus` (sine)

```js
zvuk("bubanj*2 [pljesak činela]")   //  ->  s("bd*2 [cp hh]")
```

Mini-notacija ostaje netaknuta — prevode se samo reči, nikad `* / ! @ < > [ ] { } , ~`.

### Lestvice / Scales

Srpska muzička terminologija, ne prevod engleskih reči:

| | |
|---|---|
| `dur` | major |
| `mol` | minor |
| `harmonskiMol` | harmonicMinor |
| `durskaPentatonika` | majorPentatonic |
| `hromatska` | chromatic |
| `dorska`, `frigijska`, `lidijska`, `miksolidijska`, `eolska`, `lokrijska` | the modes |

```js
nota("0 2 4 6").lestvica("c:dur")
nota("0 2 4").lestvica("a:harmonskiMol")
```

### Konstante / Constants

Frekvencijske tačke za filtere:

```js
zvuk("testera").niskopropusni(sredina)     // 1000 Hz
zvuk("testera").visokopropusni(dno)        //   50 Hz
```

`dno` 50 · `gornjeDno` 120 · `donjaSredina` 300 · `sredina` 1000 ·
`gornjaSredina` 2000 · `donjiVrh` 5000 · `vrh` 10000 · `gornjiVrh` 16000

### Note — germansko H

Srpska muzička tradicija prati nemačku: **H je h-tonalitet (B natural), a B je
b-mol (B flat)**. Ovo je isključeno podrazumevano jer menja značenje standardnog
`b`. Uključi svesno:

```js
initStrudla({ note: true })
```

---

## Kako radi / How it works

Tri različita mehanizma, jer Strudel ima tri vrste imena:

1. **Funkcije i metode** (`fast`, `.gain`) su *identifikatori*. Strudla ih
   preslikava na `globalThis` i na `Pattern.prototype`. Ćirilica i slova sa
   kvačicama su validni JavaScript identifikatori, pa `.брзо(2)` stvarno radi.

2. **Imena zvukova i lestvica** (`"bd"`, `"major"`) su *string vrednosti*, ne
   identifikatori — ne mogu se preslikati kao metode. Strudla umotava `s()` i
   `scale()` i prevodi reči unutar stringa, ostavljajući mini-notaciju netaknutu.

3. **Boje i konstante** su obične globalne vrednosti.

Ništa se ne prepisuje: psevdonim se postavlja samo ako je ime slobodno, pa
engleski Strudel API ostaje netaknut.

---

## Razvoj / Development

Jedini fajl koji se uređuje rukom je `locales/sr-latn.json`. Sve ostalo se
generiše.

```bash
# regeneriši ćirilicu + dist/strudla.js
python tools/build.py --canon tools/strudel_canonical.txt \
                      --icelandic reference/is.json

# osveži spisak kanonskih Strudel imena iz izvornog koda
python tools/extract_canonical.py /put/do/strudel

# testovi
node tools/test.mjs
```

### Validacija

`build.py` ne dozvoljava build ako neki od ovih uslova padne:

1. svaki engleski ključ mora postojati u Strudelu (provereno prema izvornom kodu)
2. nijedan srpski psevdonim ne sme zakloniti postojeće Strudel ime
3. nijedan psevdonim ne sme pripadati dvema različitim funkcijama
4. strukturna parnost sa islandskim dijalektom (referentni dijalekt)
5. svaki psevdonim mora biti validan JavaScript identifikator — i u latinici i
   u ćirilici

Ova provera je već uhvatila dve stvarne greške: `ghost` ne postoji u Strudelu
(to je Tidal funkcija), a `legato` je u srpskom ista reč pa je psevdonim bio
besmislen.

Ćirilica se ne održava ručno — generiše se transliteracijom 1:1, gde se digrafi
`dž lj nj` obrađuju pre pojedinačnih slova.

---

## Zahvalnost / Credits

Strudla sledi [Rista-vél](https://codeberg.org/jarmitage/strudel), islandski
dijalekt Strudela (Jack Armitage, Dagur Kristjánsson), koji je pokazao da
lokalizacija live coding jezika ima smisla. Islandski rečnik je korišćen kao
referenca za strukturu i pokrivenost.

[Strudel](https://strudel.cc) — Felix Roos, Alex McLean i saradnici.

## Licenca

AGPL-3.0-only, isto kao Strudel. Copyright (C) 2026 Spiraldiver.
