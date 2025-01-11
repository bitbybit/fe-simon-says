import { GameConfig } from 'service/model/GameConfig.js'
import { GameState } from 'service/model/GameState.js'
import { GameLevel } from 'service/model/GameLevel.js'
import { PlayScreen } from 'service/screen/PlayScreen.js'
import { StartScreen } from 'service/screen/StartScreen.js'

/**
 * @typedef {{
 *   increasingSymbols: GameConfig['increasingSymbols']
 *   levelsOfDifficulty: GameConfig['levelsOfDifficulty']
 *   rounds: GameConfig['rounds']
 * }} GameProps
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
   * @param {GameProps} props
   */
  constructor({
    increasingSymbols = 2,
    levelsOfDifficulty = [
      new GameLevel({
        name: 'easy',
        sequence: '0123456789',
        title: 'Easy'
      }),

      new GameLevel({
        name: 'medium',
        sequence: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        title: 'Medium'
      }),

      new GameLevel({
        name: 'hard',
        sequence: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        title: 'Hard'
      })
    ],
    rounds = 5
  } = {}) {
    this.#config = new GameConfig({
      increasingSymbols,
      levelsOfDifficulty,
      rounds
    })

    this.#state = new GameState({
      levelOfDifficulty: this.#config.levelsOfDifficulty[0],
      round: 0,
      symbols: this.#config.increasingSymbols
    })

    this.#initScreens()
  }

  #initScreens() {
    this.#screens = [
      new StartScreen({
        levelsOfDifficulty: this.#config.levelsOfDifficulty,
        state: this.#state,
        onStart: () => {
          this.#playGame()
        }
      }),

      new PlayScreen({
        levelsOfDifficulty: this.#config.levelsOfDifficulty,
        state: this.#state
      })
    ]

    this.#screens[0].activate()
  }

  #playGame() {
    this.#state.round = 1

    const playScreen = this.#screens.find(
      (screen) => screen.constructor.name === 'PlayScreen'
    )

    playScreen.activate()
  }
}
