import { BaseScreen } from 'service/BaseScreen.js'

export class PlayScreen extends BaseScreen {
  customizeContainer() {
    this.$container.innerText = 'play'
  }
}
