/**
 * @typedef {{
 *   attempts: number
 *   increasingSymbols: number
 *   levelsOfDifficulty: GameLevel[]
 *   rounds: number
 * }} GameConfigProps
 */

export class GameConfig {
  /**
   * @type {number}
   */
  increasingSymbols

  /**
   * @type {GameLevel[]}
   */
  levelsOfDifficulty

  /**
   * @type {number}
   */
  rounds

  /**
   * @type {number}
   */
  attempts

  /**
   * @param {GameConfigProps} props
   */
  constructor({ attempts, increasingSymbols, levelsOfDifficulty, rounds }) {
    this.attempts = attempts
    this.increasingSymbols = increasingSymbols
    this.levelsOfDifficulty = levelsOfDifficulty
    this.rounds = rounds
  }
}
