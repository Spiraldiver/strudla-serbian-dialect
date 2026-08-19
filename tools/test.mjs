// Strudla runtime test against a mock Strudel.
// Verifies the alias installation actually works, rather than assuming it does.
//   node tools/test.mjs

let pass = 0, fail = 0;
const ok = (cond, msg) => { cond ? (pass++, console.log('  ok   ' + msg))
                                 : (fail++, console.log('  FAIL ' + msg)); };

// ── mock Strudel ───────────────────────────────────────────────────────────
// Mirrors the shapes Strudla depends on: a Pattern class with chainable
// methods, controls exposed on globalThis, and string args for s()/scale().
class Pattern {
  constructor(v = []) { this.v = v; this.log = []; }
  queryArc() { return this.v; }
  fast(n) { this.log.push(`fast(${n})`); return this; }
  rev() { this.log.push('rev'); return this; }
  gain(n) { this.log.push(`gain(${n})`); return this; }
  scale(x) { this.log.push(`scale(${x})`); return this; }
  s(x) { this.log.push(`s(${x})`); return this; }
  room(n) { this.log.push(`room(${n})`); return this; }
}
const mk = (tag) => { const p = new Pattern(); p.log.push(tag); return p; };
globalThis.s = (x) => mk(`s(${x})`);
globalThis.sound = globalThis.s;
globalThis.note = (x) => mk(`note(${x})`);
globalThis.scale = (x) => mk(`scale(${x})`);
globalThis.fast = (n, p) => p.fast(n);
globalThis.silence = new Pattern();
globalThis.stack = (...a) => mk('stack');
globalThis.hush = () => 'hush';

const { initStrudla, strudlaInfo, recnik } = await import('../dist/strudla.js');

// ── 1. install ─────────────────────────────────────────────────────────────
console.log('\n1. installation');
const info = await initStrudla({ quiet: true });  // self-installed on import; this is idempotent
ok(info.counts.functions >= 15, `${info.counts.functions} function aliases installed (mock exposes only a few Strudel names)`);
ok(info.counts.sounds > 10, `${info.counts.sounds} sound aliases installed`);
ok(info.counts.scales > 10, `${info.counts.scales} scale aliases installed`);

// ── 2. global aliases ──────────────────────────────────────────────────────
console.log('\n2. global aliases');
ok(typeof globalThis.zvuk === 'function', 'zvuk is a global function');
ok(typeof globalThis.nota === 'function', 'nota is a global function');
ok(globalThis.tišina !== undefined || typeof globalThis.utišaj === 'function',
   'diacritic identifiers survive into globals');
ok(typeof globalThis.utisaj === 'function', 'ASCII-folded utisaj also installed');

// ── 3. method aliases on the Pattern prototype ─────────────────────────────
console.log('\n3. method aliases');
ok(typeof Pattern.prototype.brzo === 'function', 'brzo installed on Pattern');
ok(typeof Pattern.prototype.unazad === 'function', 'unazad installed on Pattern');
ok(typeof Pattern.prototype.jačina === 'function', 'jačina (diacritic) installed');
ok(typeof Pattern.prototype.jacina === 'function', 'jacina (folded) installed');

// ── 4. the aliases actually call through ───────────────────────────────────
console.log('\n4. call-through');
const p1 = globalThis.zvuk('bd').brzo(2).unazad();
ok(p1.log.includes('fast(2)'), 'brzo(2) -> fast(2)');
ok(p1.log.includes('rev'), 'unazad() -> rev');

// ── 5. sound-name translation (string values, not identifiers) ─────────────
console.log('\n5. sound-name translation');
const p2 = globalThis.zvuk('bubanj doboš');
ok(p2.log[0] === 's(bd sd)', `bubanj doboš -> bd sd   (got ${p2.log[0]})`);
const p3 = globalThis.zvuk('bubanj*2 [pljesak činela]');
ok(p3.log[0] === 's(bd*2 [cp hh])',
   `mini-notation punctuation preserved   (got ${p3.log[0]})`);
const p4 = globalThis.zvuk('bd sd');
ok(p4.log[0] === 's(bd sd)', 'English sound names still work');

// ── 6. scale translation ───────────────────────────────────────────────────
console.log('\n6. scale translation');
const p5 = globalThis.scale('c:dur');
ok(p5.log[0] === 'scale(c:major)', `c:dur -> c:major   (got ${p5.log[0]})`);
const p6 = globalThis.scale('a:mol');
ok(p6.log[0] === 'scale(a:minor)', `a:mol -> a:minor   (got ${p6.log[0]})`);

// ── 7. colors + constants ──────────────────────────────────────────────────
console.log('\n7. colors and constants');
ok(globalThis.crvena === 'red', 'crvena -> red');
ok(globalThis.sredina === 1000, 'sredina -> 1000 Hz');
ok(globalThis.vrh === 10000, 'vrh -> 10000 Hz');

// ── 8. reverse dictionary ──────────────────────────────────────────────────
console.log('\n8. rečnik (reverse lookup)');
ok(recnik('brzo') === 'fast', 'recnik("brzo") -> fast');
ok(recnik('bubanj') === 'bd', 'recnik("bubanj") -> bd');
ok(recnik('dur') === 'major', 'recnik("dur") -> major');
ok(recnik('nepostojeci') === null, 'unknown word -> null');

// ── 9. no clobbering of Strudel's own API ──────────────────────────────────
console.log('\n9. non-destructive');
ok(globalThis.fast !== undefined, 'English fast() still present');
ok(typeof Pattern.prototype.fast === 'function', 'English .fast() still present');
const p7 = globalThis.s('bd').fast(4);
ok(p7.log.includes('fast(4)'), 'English API unchanged');

// ── 10. Cyrillic locale ────────────────────────────────────────────────────
console.log('\n10. Cyrillic');
await initStrudla({ locale: 'sr-cyrl', quiet: true });
ok(typeof globalThis.звук === 'function', 'звук installed');
ok(typeof Pattern.prototype.брзо === 'function', 'брзо installed on Pattern');
const p8 = globalThis.звук('бубањ').брзо(2);
ok(p8.log[0] === 's(bd)', `бубањ -> bd   (got ${p8.log[0]})`);
ok(p8.log.includes('fast(2)'), 'брзо(2) -> fast(2)');

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
