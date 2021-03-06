const fs = require('fs')
const path = require('path')

exports.toPlugin = id => ({ id, apply: require(id) })

// Based on https://stackoverflow.com/questions/27367261/check-if-file-exists-case-sensitive
// Case checking is required, to avoid errors raised by case-sensitive-paths-webpack-plugin
function fileExistsWithCaseSync (filepath) {
  const dir = path.dirname(filepath)

  if (dir === '/' || dir === '.') {
    return true
  }

  try {
    const filenames = fs.readdirSync(dir)
    if (!filenames.includes(path.basename(filepath))) {
      return false
    }
  } catch (e) {
    // dir does not exist
    return false
  }

  return fileExistsWithCaseSync(dir)
}

exports.findExisting = (context, files) => {
  for (const file of files) {
    if (fileExistsWithCaseSync(path.join(context, file))) {
      return file
    }
  }
}
