import { BaseScreen } from 'service/screen/BaseScreen.js'

export class PlayScreen extends BaseScreen {
  customizeContainer() {
    this.$container.innerText = 'play'
  }
}
