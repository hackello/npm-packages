import readFile from '@hackello/fs/lib/read-file'
import listFiles from '@hackello/fs/lib/list-files'

export default async function findDepedencies (dirPath, depIgnores = []) {
  const files = await listFiles(dirPath, ['node_modules', 'coverage', 'package.js'].concat(depIgnores))
  const result = new Set()
  for (const file of files) {
    const content = await readFile(file)
    const requireMatches = content.match(/(require\(|from )('|")([^('|")]+)('|")/g) || []
    requireMatches.forEach((match) => {
      const packageMatches = /(([^('|")]+))/.exec((/('|")([^('|")/]+)(('|")|(\/[^/]+))/.exec(match)[0]))
      if (packageMatches) {
        result.add(packageMatches[0])
      }
    })
  }
  return [...result]
}
