import { Button } from 'service/ui/Button.js'

/**
 * @typedef {{
 *   onPress?: (value: string) => {}
 *   value: string
 * }} KeyProps
 */

export class Key {
  /**
   * @type {Button}
   */
  #button

  /**
   * @type {KeyProps['value']}
   */
  #value

  /**
   * @type {KeyProps['onPress']}
   */
  #onPress

  /**
   * @type {(e: KeyboardEvent) => {}}
   */
  #listenPressBound

  /**
   * @param {KeyProps} props
   */
  constructor({ onPress = () => {}, value }) {
    this.#value = value
    this.#onPress = onPress

    this.#button = new Button({
      title: this.#value.toUpperCase(),
      onClick: () => {
        this.#onPress(this.#value)
      }
    })

    this.#listenPressBound = this.#listenPress.bind(this)

    this.addListener()
  }

  addListener() {
    document.addEventListener('keypress', this.#listenPressBound)
  }

  removeListener() {
    document.removeEventListener('keypress', this.#listenPressBound)
  }

  /**
   * @param {KeyboardEvent} e
   */
  #listenPress(e) {
    if (
      e.key.charCodeAt(0) === this.#upperCode ||
      e.key.charCodeAt(0) === this.#lowerCode
    ) {
      this.#onPress(this.#value)
    }
  }

  /**
   * @returns {Promise}
   */
  highlight() {
    return new Promise((resolve) => {
      this.#button.highlightOn()

      setTimeout(() => {
        this.#button.highlightOff()

        resolve()
      }, 200)
    })
  }

  /**
   * @returns {number}
   */
  get #upperCode() {
    return this.#value.toUpperCase().charCodeAt(0)
  }

  /**
   * @returns {number}
   */
  get #lowerCode() {
    return this.#value.toLowerCase().charCodeAt(0)
  }

  /**
   * @returns {HTMLButtonElement}
   */
  get $element() {
    return this.#button.$element
  }
}
