# Strudla

**Srpski dijalekt za [Strudel](https://strudel.cc) — live coding na srpskom,
latinicom i ćirilicom.**

*A Serbian dialect for Strudel — live coding in Serbian, in both Latin and
Cyrillic script.*

```js
await import('https://spiraldiver.github.io/strudla-serbian-dialect/dist/strudla.js')

zvuk("bubanj [~ doboš] bubanj pljesak")
  .brzo(2)
  .lestvica("c:dur")
  .jačina(0.8)
  .soba(0.3)
```

Isti obrazac, ćirilicom / the same pattern in Cyrillic:

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

> `raw.githubusercontent.com` **ne radi** — servira `text/plain`, pa ga pregledač
> odbija kao modul. Mora GitHub Pages, jsDelivr ili Statically.

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

**116 funkcija**, 167 psevdonima na latinici (uključujući verzije bez dijakritika),
plus zvuci, lestvice, boje i konstante.

### Osnovno

| Strudel | Strudla | latinica bez kvačica |
|---|---|---|
| `s` / `sound` | `zvuk` | |
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

AGPL-3.0-only, isto kao Strudel.
