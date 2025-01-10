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
   * @param {BaseScreenProps} props
   */
  constructor({ levelsOfDifficulty, state }) {
    this.levelsOfDifficulty = levelsOfDifficulty
    this.state = state
  }

  activate() {
    this.#removeOldContainer()
    this.#insertContainer()
    this.customizeContainer()
  }

  #removeOldContainer() {
    this.state.screen?.removeContainer()
  }

  removeContainer() {
    if (this.$body.contains(this.$container)) {
      this.$container.replaceChildren()
      this.$body.removeChild(this.$container)
    }
  }

  #insertContainer() {
    this.$body.appendChild(this.$container)

    this.state.screen = this
  }

  /**
   * @abstract
   */
  customizeContainer() {
    return undefined
  }
}
