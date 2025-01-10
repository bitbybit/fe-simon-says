import { BaseScreen } from 'service/BaseScreen.js'

export class StartScreen extends BaseScreen {
  customizeContainer() {
    this.$container.innerText = 'start'
  }
}
