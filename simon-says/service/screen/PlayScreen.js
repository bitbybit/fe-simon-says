import { BaseScreen } from 'service/screen/BaseScreen.js'
import { Button } from 'service/ui/Button.js'
import { Field } from 'service/ui/Field.js'

/**
 * @typedef {BaseScreenProps & {
 *   onNewGame?: () => {}
 *   onNext?: () => {}
 *   onRepeatSequence?: () => {}
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
  repeatButton = new Button({
    title: 'Repeat the sequence',
    onClick: () => {
      this.#onRepeatSequence()
    }
  })

  /**
   * @type {Button}
   */
  newGameButton = new Button({
    title: 'New game',
    onClick: () => {
      this.#onNewGame()
    }
  })

  /**
   * @type {Button}
   */
  nextButton = new Button({
    title: 'Next',
    onClick: () => {
      this.#onNext()
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
   * @type {() => {}}
   */
  #onNext

  /**
   * @type {HTMLDivElement}
   */
  $round = document.createElement('div')

  /**
   * @type {HTMLDivElement}
   */
  $message = document.createElement('div')

  /**
   * @type {HTMLDivElement}
   */
  $controls = document.createElement('div')

  /**
   * @param {PlayScreenProps} props
   */
  constructor({
    onNewGame = () => {},
    onNext = () => {},
    onRepeatSequence = () => {},
    ...baseProps
  }) {
    super(baseProps)

    this.#onRepeatSequence = onRepeatSequence
    this.#onNewGame = onNewGame
    this.#onNext = onNext
  }

  customizeContainer() {
    this.displayRound()
    this.clearMessage()
    this.clearField()
    this.hideNextButton()

    this.$controls.append(
      this.#field.$element,
      this.repeatButton.$element,
      this.nextButton.$element,
      this.newGameButton.$element
    )

    this.$container.prepend(this.$round, this.$controls, this.$message)
  }

  displayRound() {
    this.$round.innerText = `Round: ${this.state.round}`
  }

  /**
   * @param {Object} params
   * @param {'success'|'error'|undefined} params.type
   * @param {string} params.message
   */
  setMessage({ type = 'success', message }) {
    this.$message.innerText = message
  }

  clearMessage() {
    this.setMessage({ message: '' })
  }

  /**
   * @returns {Promise<void>}
   */
  async typeSequence() {
    this.newGameButton.disable()

    await this.keyboard.typeSequence(this.state.generatedSequence)

    this.newGameButton.enable()
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

  hideNextButton() {
    this.nextButton.hide()
    this.repeatButton.show()
  }

  showNextButton() {
    this.repeatButton.hide()
    this.nextButton.show()
  }
}
