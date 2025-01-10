import { PlayScreen } from 'service/PlayScreen.js'
import { StartScreen } from 'service/StartScreen.js'

/**
 * @typedef {{
 *   name: string
 *   sequence: string
 * }} GameLevel
 */

/**
 * @typedef {{
 *   increasingSymbols: number
 *   levelsOfDifficulty: GameLevel[]
 *   rounds: number
 * }} GameConfig
 */

/**
 * @typedef {{
 *   levelOfDifficulty: GameLevel
 *   round: number
 *   screen?: BaseScreen
 *   symbols: number
 * }} GameState
 */

export class Game {
  /**
   * @type {GameConfig}
   */
  #config

  /**
   * @type {GameState}
   */
  #state

  /**
   * @type {BaseScreen[]}
   */
  #screens

  /**
   * @param {GameConfig} config
   */
  constructor({
    increasingSymbols = 2,
    levelsOfDifficulty = [
      { name: 'easy', sequence: '0123456789' },
      { name: 'medium', sequence: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' },
      { name: 'hard', sequence: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ' }
    ],
    rounds = 5
  } = {}) {
    this.#config = {
      increasingSymbols,
      levelsOfDifficulty,
      rounds
    }

    this.#state = {
      levelOfDifficulty: this.#config.levelsOfDifficulty[0],
      round: 1,
      screen: undefined,
      symbols: this.#config.increasingSymbols
    }

    this.#initScreens()
  }

  #initScreens() {
    this.#screens = [
      new StartScreen({ state: this.#state }),
      new PlayScreen({ state: this.#state })
    ]

    this.#screens[0].activate()
  }
}
