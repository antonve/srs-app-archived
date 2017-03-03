import ProdStore from './configure_store.prod'
import DevStore from './configure_store.dev'

let currentConfigureStore

if (process.env.NODE_ENV === 'production') {
  currentConfigureStore = ProdStore
} else {
  currentConfigureStore = DevStore
}

const configureStoreExport = currentConfigureStore

export default configureStoreExport
