import path from 'path'
import moduleAlias from 'module-alias'

const dirname = path.resolve()
console.log('dirname', dirname)
moduleAlias.addAliases({
  '@': path.resolve(dirname, 'src')
})
