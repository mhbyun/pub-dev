import { boot } from 'quasar/wrappers'
import clickOutside from 'src/assets/js/publish/click-outside'

export default boot(({ app }) => {
  app.directive('click-outside', clickOutside)
})
