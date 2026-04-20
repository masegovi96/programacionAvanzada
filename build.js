/**
 * build.js — Propagador de <head> compartido
 * ============================================
 * Lee components/head.html y reemplaza el contenido entre
 * <head> y el primer <title> en todas las páginas del sitio,
 * manteniendo el <title> único de cada página intacto.
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
    const rel  = path.relative(ROOT, full).replace(/\\/g, '/');
    if (stat.isDirectory()) {
      if (!SKIP_DIRS.includes(item)) findHtmlFiles(full, files);
    } else if (item.endsWith('.html')) {
      files.push({ full, rel });
    }
  }
  return files;
}

// Inyecta el fragmento compartido justo después de <head>,
// antes del <title> existente de cada página.
function injectHead(content, sharedHead) {
  // Coincide con todo lo que hay entre <head> (inclusive) y el <title> (exclusive)
  return content.replace(
    /(<head>\s*\n)([\s\S]*?)(<title>)/,
    (_, openTag, _existing, titleTag) =>
      `${openTag}${sharedHead}\n    ${titleTag}`
  );
}

// ---------- main ----------

if (!fs.existsSync(HEAD_FILE)) {
  console.error('Error: no se encontró components/head.html');
  process.exit(1);
}

// Normaliza indentación del fragmento (4 espacios por línea)
const rawHead    = fs.readFileSync(HEAD_FILE, 'utf8').trim();
const sharedHead = rawHead
  .split('\n')
  .filter(line => !line.trim().startsWith('<!--'))  // quita comentarios del fragmento
  .map(line => '    ' + line.trim())
  .join('\n');

const files   = findHtmlFiles(ROOT);
let   updated = 0;

for (const { full, rel } of files) {
  const original = fs.readFileSync(full, 'utf8');
  const result   = injectHead(original, sharedHead);

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
