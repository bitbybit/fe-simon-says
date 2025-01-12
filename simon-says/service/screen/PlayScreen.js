import { BaseScreen } from 'service/screen/BaseScreen.js'
import { Button } from 'service/ui/Button.js'

/**
 * @typedef {BaseScreen & {
 *   onRepeatSequence?: () => {}
 *   onNewGame?: () => {}
 * }} PlayScreenProps
 */

export class PlayScreen extends BaseScreen {
  /**
   * @type {Button}
   */
  #repeatButton = new Button({
    title: 'Repeat the sequence',
    onClick: () => {
      this.#onRepeatSequence()
    }
  })

  /**
   * @type {Button}
   */
  #newGameButton = new Button({
    title: 'New game',
    onClick: () => {
      this.#onNewGame()
    }
  })

  /**
   * @type {() => {}}
   */
  #onRepeatSequence

  /**
   * @type {() => {}}
   */
  #onNewGame

  /**
   * @type {HTMLDivElement}
   */
  $round = document.createElement('div')

  /**
   * @type {HTMLDivElement}
   */
  $controls = document.createElement('div')

  /**
   * @param {PlayScreenProps} props
   */
  constructor({
    onRepeatSequence = () => {},
    onNewGame = () => {},
    ...baseProps
  }) {
    super(baseProps)

    this.#onRepeatSequence = onRepeatSequence
    this.#onNewGame = onNewGame
  }

  customizeContainer() {
    this.#displayRound()

    this.$controls.append(
      this.#repeatButton.$element,
      this.#newGameButton.$element
    )

    this.$container.prepend(this.$round, this.$controls)
  }

  #displayRound() {
    this.$round.innerText = `Round: ${this.state.round}`
  }
}
