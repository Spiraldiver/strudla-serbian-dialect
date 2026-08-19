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
  .kašnjenje(0.3).sinhronKašnjenja(3/9)
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
