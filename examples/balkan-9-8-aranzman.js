await import('https://spiraldiver.github.io/strudla-serbian-dialect/dist/strudla.js')
samples('github:Spiraldiver/samples_percs')

// 9/8 — grupisano 2+2+2+3 (dajčovo), 300 osmina u minuti
setcpm(300/9)

// ── 4 glasa, isti crate kao Procedural Drums, ali u 9 koraka ──────────────
const kik    = broj("<0 ~ ~ ~ 0 ~ ~ ~ ~>*9").zvuk("crate_bd").jačina(1.0)
const dobos  = broj("<~ ~ 0 ~ ~ ~ 0 ~ ~>*9").zvuk("crate_sd").jačina(0.62)
const hetovi = broj("<0 0 0 0 0 0 0 0 0>*9").zvuk("crate_hh")
  .jačina("0.86 0.4 0.7 0.4 0.7 0.4 0.86 0.4 0.4")
const perk   = broj("<~ ~ ~ ~ ~ ~ 0 ~ ~>*9").zvuk("crate_rd").jačina(0.44)

// ── varijante istog materijala (kao Build Procedural Arrangement) ─────────
const kikV   = kik.često(x => x.brzo(2))
const dobosV = dobos.razdvoji(unazad)

// ── aranžman: 4 dela ─────────────────────────────────────────────────────
$: aranžman(
  [4, slog(kik, hetovi)],                    // 1. kik + osmine
  [4, slog(kik, hetovi, dobos)],             // 2. + doboš
  [4, slog(kik, hetovi, dobos, perk)],       // 3. + perkusija
  [4, slog(kikV, hetovi, dobosV, perk)]      // 4. varijante
)
