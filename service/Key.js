import { Button } from 'service/ui/Button.js'

/**
 * @typedef {{
 *   onPress?: (value: string) => {}
 *   value: string
 * }} KeyProps
 */

export class Key {
  /**
   * @type {number}
   * @readonly
   */
  #highlightTimeout = 300

  /**
   * @type {Button}
   */
  #button

  /**
   * @type {KeyProps['value']}
   */
  value

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
    this.value = value
    this.#onPress = onPress

    this.#button = new Button({
      title: this.value.toUpperCase(),
      onClick: () => {
        this.#onPress(this.value)
      }
    })

    this.#listenPressBound = this.#listenPress.bind(this)
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
      (e.key.charCodeAt(0) === this.#upperCode ||
        e.key.charCodeAt(0) === this.#lowerCode) &&
      !this.#button.isDisabled
    ) {
      this.#onPress(this.value)
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
      }, this.#highlightTimeout / 2)
    })
  }

  /**
   * @returns {Promise}
   */
  slowHighlight() {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.#button.highlightOn()

        setTimeout(() => {
          this.#button.highlightOff()

          resolve()
        }, this.#highlightTimeout * 2)
      }, this.#highlightTimeout)
    })
  }

  disable() {
    this.removeListener()
    this.#button.disable()
  }

  enable() {
    this.addListener()
    this.#button.enable()
  }

  /**
   * @returns {number}
   */
  get #upperCode() {
    return this.value.toUpperCase().charCodeAt(0)
  }

  /**
   * @returns {number}
   */
  get #lowerCode() {
    return this.value.toLowerCase().charCodeAt(0)
  }

  /**
   * @returns {HTMLButtonElement}
   */
  get $element() {
    return this.#button.$element
  }
}
