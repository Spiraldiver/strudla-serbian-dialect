// Strudla — primeri / examples
// Zalepi u strudel.cc  /  paste into strudel.cc

await import('https://spiraldiver.github.io/strudla-serbian-dialect/dist/strudla.js')

// 1. osnovni ritam
zvuk("bubanj [~ doboš] bubanj doboš").brzo(2)

// 2. lestvica i melodija
nota("0 2 4 6 4 2").lestvica("c:dur").zvuk("klavir").jačina(0.7)

// 3. filter sa konstantama
zvuk("testera*8").niskopropusni(sredina).rezonanca(8).soba(0.4)

// 4. transformacije po ciklusu
zvuk("bubanj*4").svaki(3, unazad).razdvoji(unazad)

// 5. ćirilica
звук("бубањ [~ добош]").брзо(2).соба(0.3)

// 6. oba pisma odjednom
await initStrudla({ locale: ['sr-latn', 'sr-cyrl'] })

// 7. šta je koja reč?
rečnik("brzo")      // -> "fast"
strudlaInfo()       // -> svi aktivni psevdonimi
