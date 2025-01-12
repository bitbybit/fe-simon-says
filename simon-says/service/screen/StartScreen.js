import { BaseScreen } from 'service/screen/BaseScreen.js'
import { Button } from 'service/ui/Button.js'

/**
 * @typedef {BaseScreen & {
 *   onStart?: () => {}
 * }} StartScreenProps
 */

export class StartScreen extends BaseScreen {
  /**
   * @type {Button}
   */
  #startButton = new Button({
    title: 'Start',
    onClick: () => {
      this.#onStart()
    }
  })

  /**
   * @type {() => {}}
   */
  #onStart

  /**
   * @param {StartScreenProps} props
   */
  constructor({ onStart = () => {}, ...baseProps }) {
    super(baseProps)

    this.#onStart = onStart
  }

  customizeContainer() {
    this.$container.prepend(this.#startButton.$element)
  }
}
