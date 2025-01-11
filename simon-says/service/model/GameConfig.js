/**
 * @typedef {{
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
   * @param {GameConfigProps} props
   */
  constructor({ increasingSymbols, levelsOfDifficulty, rounds }) {
    this.increasingSymbols = increasingSymbols
    this.levelsOfDifficulty = levelsOfDifficulty
    this.rounds = rounds
  }
}
