const { readdirSync, promises: fs } = require('fs')
const path = require('path')
const fm = require('front-matter')
const outFile = path.join(__dirname, 'pages/blog/_data.json')

async function recursiveReadDir(directory, { ignore = /_/, include = /\.svx$/ } = {}) {
  const result = []
  const nestedGetFiles = async nestedDirectory => {
    const files = readdirSync(nestedDirectory, { withFileTypes: true })
    for (let i = 0; i < files.length; i++) {
      const f = files[i]
      const fPath = path.join(nestedDirectory, f.name)
      if (!ignore.test(f.name)) {
        if (f.isDirectory()) {
          nestedGetFiles(fPath)
        } else if (include.test(f.name)) {
          result.push(fPath)
        }
      }
    }
  }
  await nestedGetFiles(directory)
  return result
}

async function main() {
  const posts = await recursiveReadDir(path.join(__dirname, 'pages/blog'))
  let data = []
  for (let post of posts) {
    // This will give you a valid svelte component
    const matter = fm(await fs.readFile(post, 'utf8'))
    data.push([post, matter.attributes])
  }
  try {
    await fs.writeFile(outFile, JSON.stringify(data), 'utf8')
  } catch (error) {
    throw error
  }
}

main()
