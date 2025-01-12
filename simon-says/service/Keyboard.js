import { Key } from 'service/Key.js'

/**
 * @typedef {{
 *   onPress?: (value: string) => {}
 *   sequence: GameLevel['sequence']
 * }} KeyboardProps
 */

export class Keyboard {
  /**
   * @type {Key[]}
   */
  #keys = []

  /**
   * @type {(value: string) => {}}
   */
  #onPress

  /**
   * @type {string|null}
   */
  #pressed = null

  /**
   * @param {KeyboardProps} props
   */
  constructor({ onPress = () => {}, sequence }) {
    this.#onPress = onPress

    this.setSequence(sequence)
  }

  /**
   * @param {GameLevel['sequence']} sequence
   */
  setSequence(sequence) {
    for (const key of this.#keys) {
      key.removeListener()
    }

    this.#keys = []

    const values = sequence.split('')

    for (const value of values) {
      const key = new Key({
        value,

        onPress: (value) =>
          this.#type({
            key,
            value,
            callback: this.#onPress
          })
      })

      this.#keys.push(key)
    }
  }

  disable() {
    for (const key of this.#keys) {
      key.disable()
    }
  }

  enable() {
    for (const key of this.#keys) {
      key.enable()
    }
  }

  /**
   * @param {Object} props
   * @param {((value: string) => {})|undefined} props.callback
   * @param {Key} props.key
   * @param {boolean|undefined} props.isLongPress
   * @param {string} props.value
   * @returns {Promise<void>}
   */
  async #type({ callback = () => {}, key, isLongPress = false, value }) {
    if (this.#isPressed) {
      return
    }

    this.#pressed = value.toLowerCase()

    if (isLongPress) {
      await key.slowHighlight()
    } else {
      await key.highlight()
    }

    callback(this.#pressed)

    this.#pressed = null
  }

  /**
   * @param {string} sequence
   */
  async typeSequence(sequence) {
    console.log(`SEQUENCE: ${sequence}`)

    this.disable()

    this.#pressed = null

    for (const value of sequence) {
      const key = this.#keys.find((key) => key.value === value)

      await this.#type({
        key,
        value,
        isLongPress: true
      })
    }

    this.enable()
  }

  /**
   * @returns {HTMLButtonElement[]}
   */
  get $elements() {
    return this.#keys.map((key) => key.$element)
  }

  /**
   * @returns {boolean}
   */
  get #isPressed() {
    return this.#pressed !== null
  }
}
