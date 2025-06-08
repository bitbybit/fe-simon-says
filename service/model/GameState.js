/**
 * @typedef {{
 *   levelOfDifficulty: GameLevel
 *   screen?: BaseScreen
 * }} GameStateProps
 */

export class GameState {
  /**
   * @type {GameLevel}
   */
  levelOfDifficulty

  /**
   * @type {number}
   */
  round = 0

  /**
   * @type {string}
   */
  generatedSequence = ''

  /**
   * @type {string}
   */
  typedSequence = ''

  /**
   * @type {BaseScreen|undefined}
   */
  screen

  /**
   * @type {number}
   */
  attempt = 0

  /**
   * @param {GameStateProps} props
   */
  constructor({ levelOfDifficulty, screen }) {
    this.levelOfDifficulty = levelOfDifficulty
    this.screen = screen
  }

  /**
   * @returns {boolean}
   */
  get isStarted() {
    return this.round > 0
  }

  /**
   * @returns {boolean}
   */
  get isTypedFullSequence() {
    return this.typedSequence.length === this.generatedSequence.length
  }
}
