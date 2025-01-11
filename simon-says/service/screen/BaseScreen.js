import { Keyboard } from 'service/Keyboard.js'
import { DifficultyLevel } from 'service/DifficultyLevel.js'

/**
 * @typedef {{
 *   levelsOfDifficulty: GameLevel[]
 *   state: GameState
 * }} BaseScreenProps
 */

export class BaseScreen {
  /**
   * @type {GameState}
   * @protected
   */
  state

  /**
   * @type {GameLevel[]}
   * @protected
   */
  levelsOfDifficulty

  /**
   * @type {Keyboard}
   * @protected
   */
  keyboard

  /**
   * @type {DifficultyLevel}
   * @protected
   */
  difficultyLevel

  /**
   * @type {HTMLElement}
   * @protected
   */
  $body = document.body

  /**
   * @type {HTMLDivElement}
   * @protected
   */
  $container = document.createElement('div')

  /**
   * @type {HTMLDivElement}
   * @protected
   */
  $difficultyLevelContainer = document.createElement('div')

  /**
   * @type {HTMLDivElement}
   * @protected
   */
  $keyboardContainer = document.createElement('div')

  /**
   * @param {BaseScreenProps} props
   */
  constructor({ levelsOfDifficulty, state }) {
    this.levelsOfDifficulty = levelsOfDifficulty
    this.state = state

    this.keyboard = new Keyboard({
      sequence: this.state.levelOfDifficulty.sequence,
      onPress: (symbol) => {
        console.log(symbol)
      }
    })
  }

  /**
   * @public
   */
  activate() {
    this.#removeOldContainer()
    this.#insertContainer()

    this.#setDifficultyLevel()
    this.#setKeyboardSequence()

    this.customizeContainer()
  }

  /**
   * @private
   */
  #removeOldContainer() {
    this.state.screen?.removeContainer()
  }

  /**
   * @public
   */
  removeContainer() {
    if (this.$body.contains(this.$container)) {
      this.$container.replaceChildren()
      this.$body.removeChild(this.$container)
    }
  }

  /**
   * @private
   */
  #insertContainer() {
    this.$body.appendChild(this.$container)

    this.$container.append(
      this.$difficultyLevelContainer,
      this.$keyboardContainer
    )

    this.state.screen = this
  }

  /**
   * @private
   */
  #setDifficultyLevel() {
    this.difficultyLevel = new DifficultyLevel({
      levelsOfDifficulty: this.levelsOfDifficulty,
      state: this.state,
      onChange: () => {
        this.#setKeyboardSequence()
      }
    })

    this.$difficultyLevelContainer.replaceChildren(
      ...this.difficultyLevel.$elements
    )

    if (this.state.isStarted) {
      this.difficultyLevel.disable()
    }
  }

  /**
   * @private
   */
  #setKeyboardSequence() {
    this.keyboard.setSequence(this.state.levelOfDifficulty.sequence)
    this.$keyboardContainer.replaceChildren(...this.keyboard.$elements)

    if (!this.state.isStarted) {
      this.keyboard.disable()
    } else {
      this.keyboard.enable()
    }
  }

  /**
   * @abstract
   */
  customizeContainer() {
    return undefined
  }
}
