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
   * @type {KeyboardProps['onPress']}
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
        onPress: async (value) => {
          if (this.#pressed !== null) {
            return
          }

          this.#pressed = value.toLowerCase()

          this.#onPress(this.#pressed)

          await key.highlight()

          this.#pressed = null
        }
      })

      this.#keys.push(key)
    }
  }

  /**
   * @returns {HTMLButtonElement[]}
   */
  get $elements() {
    return this.#keys.map((key) => key.$element)
  }
}
