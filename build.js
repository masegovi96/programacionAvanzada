/**
 * build.js — Propagador de componentes compartidos
 * ==================================================
 * 1. Lee components/head.html y reemplaza el bloque <head> en todas las páginas,
 *    manteniendo el <title> único de cada una.
 * 2. Asegura que cada página tenga un <div id="footer-container"></div>
 *    antes de </body> si todavía no lo tiene (scripts.js lo rellena en runtime).
 *
 * Uso:
 *   node build.js          → actualiza todas las páginas
 *   node build.js --dry    → muestra qué cambiaría sin escribir
 */

const fs   = require('fs');
const path = require('path');

const ROOT       = path.resolve(__dirname);
const HEAD_FILE  = path.join(ROOT, 'components', 'head.html');
const DRY_RUN    = process.argv.includes('--dry');
const SKIP_DIRS  = ['node_modules', '.git', 'components'];

// ---------- helpers ----------

function findHtmlFiles(dir, files = []) {
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (!SKIP_DIRS.includes(item)) findHtmlFiles(full, files);
    } else if (item.endsWith('.html')) {
      files.push({ full, rel: path.relative(ROOT, full).replace(/\\/g, '/') });
    }
  }
  return files;
}

// Inyecta el <head> compartido justo después de <head>, antes del <title> existente.
function injectHead(content, sharedHead) {
  return content.replace(
    /(<head>\s*\n)([\s\S]*?)(<title>)/,
    (_, openTag, _existing, titleTag) =>
      `${openTag}${sharedHead}\n    ${titleTag}`
  );
}

// Asegura que exista <div id="footer-container"></div> antes de </body>.
function ensureFooterContainer(content) {
  if (content.includes('id="footer-container"')) return content;
  return content.replace(
    /(\s*<\/body>)/,
    '\n    <div id="footer-container"></div>$1'
  );
}

// ---------- main ----------

if (!fs.existsSync(HEAD_FILE)) {
  console.error('Error: no se encontró components/head.html');
  process.exit(1);
}

const rawHead    = fs.readFileSync(HEAD_FILE, 'utf8').trim();
const sharedHead = rawHead
  .split('\n')
  .filter(line => !line.trim().startsWith('<!--'))
  .map(line => '    ' + line.trim())
  .join('\n');

const files   = findHtmlFiles(ROOT);
let   updated = 0;

for (const { full, rel } of files) {
  const original = fs.readFileSync(full, 'utf8');
  let   result   = injectHead(original, sharedHead);
  result         = ensureFooterContainer(result);

  if (result === original) {
    console.log('– Sin cambios:', rel);
    continue;
  }

  if (DRY_RUN) {
    console.log('(dry) Cambiaría:', rel);
  } else {
    fs.writeFileSync(full, result, 'utf8');
    console.log('✔ Actualizado:', rel);
  }
  updated++;
}

console.log(`\n${DRY_RUN ? '[DRY RUN] ' : ''}Listo. ${updated} páginas ${DRY_RUN ? 'afectadas' : 'actualizadas'} de ${files.length}.`);
