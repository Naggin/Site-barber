import { readFileSync, readdirSync, mkdirSync, writeFileSync } from 'node:fs'
import { Buffer } from 'node:buffer'
import { Script } from 'node:vm'

const root = new URL('../', import.meta.url)
const dist = new URL('dist/', root)
let html = readFileSync(new URL('index.html', dist), 'utf8')
const scriptTag = html.match(/<script\b[^>]*src="([^"]+)"[^>]*><\/script>/)
const stylesheet = html.match(/<link\b[^>]*rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/)
if (!scriptTag || !stylesheet) throw new Error('Build incompleto: execute npm run build antes de exportar.')

let script = readFileSync(new URL(scriptTag[1].replace(/^\//, ''), dist), 'utf8')
let css = readFileSync(new URL(stylesheet[1].replace(/^\//, ''), dist), 'utf8')
const mimeTypes = { webp: 'image/webp', ttf: 'font/ttf', woff: 'font/woff', woff2: 'font/woff2' }

for (const folder of ['images', 'fonts']) {
  for (const filename of readdirSync(new URL(`${folder}/`, dist))) {
    const mime = mimeTypes[filename.split('.').at(-1)]
    if (!mime) continue
    const bytes = readFileSync(new URL(`${folder}/${filename}`, dist))
    const dataUrl = `data:${mime};base64,${Buffer.from(bytes).toString('base64')}`
    const path = `/${folder}/${filename}`
    script = script.replaceAll(path, dataUrl)
    css = css.replaceAll(path, dataUrl)
    html = html.replaceAll(path, dataUrl)
  }
}

const favicon = readFileSync(new URL('favicon.svg', dist)).toString('base64')
html = html.replaceAll('/favicon.svg', `data:image/svg+xml;base64,${favicon}`)

// A prévia não precisa de imports nem de um servidor ao ser aberta no computador.
new Script(script)
script = script.replaceAll('</script', '<\\/script')
html = html.replace(scriptTag[0], '')
html = html.replace(stylesheet[0], () => `<style>${css}</style>`)
html = html.replace('</body>', () => `<script>${script}</script>\n</body>`)

const preview = new URL('preview/', root)
mkdirSync(preview, { recursive: true })
writeFileSync(new URL('kreuz-barber.html', preview), html)
console.log('Prévia criada: preview/kreuz-barber.html. Baixe o arquivo e abra no navegador.')
