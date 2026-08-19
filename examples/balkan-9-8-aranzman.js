await import('https://spiraldiver.github.io/strudla-serbian-dialect/dist/strudla.js')
samples('github:Spiraldiver/samples_percs')

// 9/8 — grupisano 2+2+2+3 (dajčovo), 300 osmina u minuti
// ceo komad: 16 taktova
setcpm(300/9)

// ── bubnjevi ─────────────────────────────────────────────────────────────
const kik    = broj("<0 ~ ~ ~ 0 ~ ~ ~ ~>*9").zvuk("crate_bd").preseci(1).jačina(1.0)
const dobos  = broj("<~ ~ 0 ~ ~ ~ 0 ~ ~>*9").zvuk("crate_sd").preseci(2).jačina(0.62)
const hetovi = broj("<0 0 0 0 0 0 0 0 0>*9").zvuk("crate_hh").preseci(3)
  .jačina("0.86 0.4 0.7 0.4 0.7 0.4 0.86 0.4 0.4")
const perk   = broj("<~ ~ ~ ~ ~ ~ 0 ~ ~>*9").zvuk("crate_rd").preseci(4).jačina(0.44)

// ── bas ──────────────────────────────────────────────────────────────────
const bas = nota("d2 ~ d2 ~ a1 ~ bb1 ~ ~")
  .zvuk("testera").niskopropusni(400).rezonanca(6).jačina(0.7)

// ── sintisajzer ──────────────────────────────────────────────────────────
const sint = nota("0 1 4 3 2 1 0 -3 [0 1]")
  .lestvica("d:frigijska:dominantna")
  .zvuk("testera")
  .niskopropusni(sinus.opseg(600, 3200)).rezonanca(14)
  .kašnjenje(0.25).soba(0.3).jačina(0.45)

// ── bubnjevi: 4 dela po 4 takta ──────────────────────────────────────────
const bubnjeviArr = aranžman(
  [4, slog(kik, hetovi)],
  [4, slog(kik, hetovi, dobos)],
  [4, slog(kik, hetovi, dobos, perk)],
  [4, slog(kik.često(x => x.brzo(2)), hetovi, dobos.razdvoji(unazad), perk)]
)

// ── bas: ćuti 8 taktova, pa STABILAN do kraja ────────────────────────────
const basArr = aranžman(
  [8, tišina],
  [8, bas]
)

// ── sintisajzer: sopstveni duboki aranžman, 8 delova po 2 takta ──────────
const sintArr = aranžman(
  [2, tišina],
  [2, sint],
  [2, sint.svaki(2, unazad)],
  [2, sint.smenjuj(4)],
  [2, sint.brzo(2).razgradiSa(0.25)],
  [2, sint.razdvoji(unazad)],
  [2, sint.ponekadSa(0.5, x => x.brzo(2))],
  [2, sint.unazad().razdvoji(unazad)]
)

$: slog(bubnjeviArr, basArr, sintArr)
