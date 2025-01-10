import { Switcher } from 'service/ui/Switcher.js'

/**
 * @typedef {{
 *   levelsOfDifficulty: GameLevel[]
 *   state: GameState
 * }} DifficultyLevelProps
 */

export class DifficultyLevel {
  /**
   * @type {GameState}
   */
  #state

  /**
   * @type {GameLevel[]}
   */
  #levelsOfDifficulty

  /**
   * @type {Switcher}
   */
  #switcher

  /**
   * @param {DifficultyLevelProps} props
   */
  constructor({ levelsOfDifficulty, state }) {
    this.#state = state
    this.#levelsOfDifficulty = levelsOfDifficulty

    this.#switcher = new Switcher({
      value: this.#state.levelOfDifficulty.name,
      options: this.#options,
      onClick: (value) => {
        this.#setLevel(value)
      }
    })
  }

  /**
   * @param {SwitcherOption['value']} value
   */
  #setLevel(value) {
    this.#state.levelOfDifficulty = this.#levelsOfDifficulty.find(
      ({ name }) => name === value
    )
  }

  /**
   * @returns {SwitcherOption[]}
   */
  get #options() {
    return this.#levelsOfDifficulty.map(({ name: value, title }) => ({
      value,
      title
    }))
  }

  /**
   * @returns {HTMLButtonElement[]}
   */
  get $elements() {
    return this.#switcher.buttons.map(({ $element }) => $element)
  }
}
