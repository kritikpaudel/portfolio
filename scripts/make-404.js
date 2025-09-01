// scripts/make-404.js
import fs from 'fs'
import path from 'path'

const src = path.join('dist', 'index.html')
const dest = path.join('dist', '404.html')

if (fs.existsSync(src)) {
  fs.copyFileSync(src, dest)
  console.log('Created dist/404.html for SPA fallback.')
} else {
  console.error('dist/index.html not found. Did the build run?')
  process.exit(1)
}
