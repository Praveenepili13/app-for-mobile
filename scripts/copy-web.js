const fs = require('fs');
const path = require('path');

const root = process.cwd();
const webDir = path.join(root, 'www');

async function rimraf(dir) {
  if (!fs.existsSync(dir)) return;
  const stat = fs.statSync(dir);
  if (stat.isDirectory()) {
    for (const entry of fs.readdirSync(dir)) {
      rimraf(path.join(dir, entry));
    }
    try { fs.rmdirSync(dir); } catch (e) {}
  } else {
    try { fs.unlinkSync(dir); } catch (e) {}
  }
}

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src)) {
      copyRecursive(path.join(src, entry), path.join(dest, entry));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

async function prepare() {
  // remove existing www
  try { rimraf(webDir); } catch (e) { }
  fs.mkdirSync(webDir, { recursive: true });

  // copy root-level HTML/CSS/JS files
  const rootFiles = fs.readdirSync(root);
  for (const f of rootFiles) {
    const full = path.join(root, f);
    const stat = fs.statSync(full);
    if (stat.isFile()) {
      if (f.endsWith('.html') || f.endsWith('.css') || f.endsWith('.js')) {
        copyRecursive(full, path.join(webDir, f));
      }
    }
  }

  // copy common asset directories if they exist
  const assetDirs = ['assets', 'css', 'js', 'images', 'icons'];
  for (const d of assetDirs) {
    const src = path.join(root, d);
    if (fs.existsSync(src)) {
      copyRecursive(src, path.join(webDir, d));
    }
  }

  // If index.html is missing at root but exists in src/ or public/, try those
  const altIndex = ['src/index.html', 'public/index.html'];
  for (const alt of altIndex) {
    const p = path.join(root, alt);
    if (fs.existsSync(p) && !fs.existsSync(path.join(webDir, 'index.html'))) {
      copyRecursive(p, path.join(webDir, 'index.html'));
    }
  }

  console.log('Prepared web assets in ./www');
}

prepare().catch(err => {
  console.error(err);
  process.exit(1);
});
