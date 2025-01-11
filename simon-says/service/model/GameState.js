/**
 * @typedef {{
 *   levelOfDifficulty: GameLevel
 *   round: number
 *   screen?: BaseScreen
 *   symbols: number
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
  round

  /**
   * @type {BaseScreen|undefined}
   */
  screen

  /**
   * @type {number}
   */
  symbols

  /**
   * @param {GameStateProps} props
   */
  constructor({ levelOfDifficulty, round, screen, symbols }) {
    this.levelOfDifficulty = levelOfDifficulty
    this.round = round
    this.screen = screen
    this.symbols = symbols
  }

  /**
   * @returns {boolean}
   */
  get isStarted() {
    return this.round > 0
  }
}
