import { PlayScreen } from 'service/screen/PlayScreen.js'
import { StartScreen } from 'service/screen/StartScreen.js'

/**
 * @typedef {{
 *   name: string
 *   sequence: string
 *   title: string
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
      { name: 'easy', sequence: '0123456789', title: 'Easy' },
      {
        name: 'medium',
        sequence: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        title: 'Medium'
      },
      {
        name: 'hard',
        sequence: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        title: 'Hard'
      }
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
      new StartScreen({
        levelsOfDifficulty: this.#config.levelsOfDifficulty,
        state: this.#state
      }),
      new PlayScreen({
        levelsOfDifficulty: this.#config.levelsOfDifficulty,
        state: this.#state
      })
    ]

    this.#screens[0].activate()
  }
}
