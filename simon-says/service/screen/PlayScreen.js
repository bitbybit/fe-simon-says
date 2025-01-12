import { BaseScreen } from 'service/screen/BaseScreen.js'
import { Button } from 'service/ui/Button.js'
import { Field } from 'service/ui/Field.js'

/**
 * @typedef {BaseScreenProps & {
 *   onRepeatSequence?: () => {}
 *   onNewGame?: () => {}
 * }} PlayScreenProps
 */

export class PlayScreen extends BaseScreen {
  /**
   * @type {Field}
   */
  #field = new Field()

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
    this.displayRound()

    this.#field.clear()

    this.$controls.append(
      this.#field.$element,
      this.#repeatButton.$element,
      this.#newGameButton.$element
    )

    this.$container.prepend(this.$round, this.$controls)
  }

  displayRound() {
    this.$round.innerText = `Round: ${this.state.round}`
  }

  /**
   * @returns {Promise<void>}
   */
  typeSequence() {
    return this.keyboard.typeSequence(this.state.generatedSequence)
  }

  /**
   * @param {string} value
   */
  addToField(value) {
    this.#field.addValue(value)
  }

  clearField() {
    this.#field.clear()
  }
}
