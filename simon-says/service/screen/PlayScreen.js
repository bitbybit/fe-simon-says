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
    title: 'Repeat',
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

    this.$controls.classList.add('grid', 'mt-4', 'mb-4')

    this.nextButton.$element.classList.add('btn-success')
    this.newGameButton.$element.classList.add('btn-warning')

    this.$controls.append(
      this.#field.$element,
      this.repeatButton.$element,
      this.nextButton.$element,
      this.newGameButton.$element
    )

    this.$container.prepend(this.$titleContainer)

    this.$container.append(this.$controls, this.$message)
  }

  displayRound() {
    this.$titleContainer.innerText = `Round: ${this.state.round}`
  }

  /**
   * @param {Object} params
   * @param {'success'|'error'|undefined} params.type
   * @param {string} params.message
   */
  setMessage({ type = 'success', message }) {
    this.$message.innerText = message

    switch (true) {
      case type === 'success':
        this.$message.classList.add('text-success')
        break

      case type === 'error':
        this.$message.classList.add('text-danger')
        break

      default:
        break
    }
  }

  clearMessage() {
    this.$message.classList.remove('text-success')
    this.$message.classList.remove('text-danger')

    this.setMessage({ message: '' })
  }

  /**
   * @returns {Promise<void>}
   */
  async typeSequence() {
    const wasRepeatDisabled = this.repeatButton.isDisabled

    if (!wasRepeatDisabled) {
      this.repeatButton.disable()
    }

    this.newGameButton.disable()

    await this.keyboard.typeSequence(this.state.generatedSequence)

    if (!wasRepeatDisabled) {
      this.repeatButton.enable()
    }

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
