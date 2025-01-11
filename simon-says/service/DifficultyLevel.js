import { SwitcherOption } from 'service/model/SwitcherOption.js'
import { Switcher } from 'service/ui/Switcher.js'

/**
 * @typedef {{
 *   levelsOfDifficulty: GameLevel[]
 *   onChange?: (value: GameLevel) => {}
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
   * @type {DifficultyLevelProps['onChange']}
   */
  #onChange

  /**
   * @param {DifficultyLevelProps} props
   */
  constructor({ levelsOfDifficulty, onChange = () => {}, state }) {
    this.#state = state
    this.#levelsOfDifficulty = levelsOfDifficulty
    this.#onChange = onChange

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
    const levelOfDifficulty = this.#levelsOfDifficulty.find(
      ({ name }) => name === value
    )

    this.#state.levelOfDifficulty = levelOfDifficulty

    this.#onChange(levelOfDifficulty)
  }

  /**
   * @returns {SwitcherOption[]}
   */
  get #options() {
    return this.#levelsOfDifficulty.map(
      ({ name: value, title }) =>
        new SwitcherOption({
          value,
          title
        })
    )
  }

  /**
   * @returns {HTMLButtonElement[]}
   */
  get $elements() {
    return this.#switcher.buttons.map(({ $element }) => $element)
  }
}
