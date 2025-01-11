import { BaseScreen } from 'service/screen/BaseScreen.js'
import { Button } from 'service/ui/Button.js'

/**
 * @typedef {BaseScreen & {
 *   onStart
 * }} StartScreenProps
 */

export class StartScreen extends BaseScreen {
  /**
   * @type {() => {}}
   */
  #onStart

  constructor({ onStart = () => {}, ...props }) {
    super(props)

    this.#onStart = onStart
  }

  customizeContainer() {
    const startButton = new Button({
      title: 'Start',
      onClick: () => {
        this.#onStart()
      }
    })

    this.$container.prepend(startButton.$element)
  }
}
