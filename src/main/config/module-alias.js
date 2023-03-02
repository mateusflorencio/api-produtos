import path from 'path'
import moduleAlias from 'module-alias'

const dirname = path.resolve()
moduleAlias.addAliases({
  '@': path.resolve(dirname, 'src')
})
