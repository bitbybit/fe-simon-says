import { BaseScreen } from 'service/screen/BaseScreen.js'
import { Button } from 'service/ui/Button.js'

/**
 * @typedef {BaseScreenProps & {
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
    this.$titleContainer.innerText = 'Simon Says'

    this.$container.prepend(this.$titleContainer)

    this.#startButton.$element.classList.add('btn-success')

    this.$container.appendChild(this.#startButton.$element)
  }
}
