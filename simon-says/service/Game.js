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
      levelOfDifficulty: this.#config.levelsOfDifficulty[0]
    })

    this.#initScreens()
  }

  #initScreens() {
    this.#screens = [
      new StartScreen({
        levelsOfDifficulty: this.#config.levelsOfDifficulty,
        state: this.#state,

        onStart: async () => {
          await this.#playGame()
        }
      }),

      new PlayScreen({
        levelsOfDifficulty: this.#config.levelsOfDifficulty,
        state: this.#state,

        onRepeatSequence: async () => {
          await this.#playScreen.typeSequence()
        },

        onNewGame: () => {
          this.#finishGame()
        },

        onPress: async (symbol) => {
          await this.#addToTypedSequence(symbol)
        }
      })
    ]

    this.#startScreen.activate()
  }

  async #playGame() {
    this.#nextRound()

    this.#playScreen.activate()
    await this.#playScreen.typeSequence()
  }

  #finishGame() {
    this.#state.round = 0
    this.#state.typedSequence = ''

    this.#playScreen.clearField()
    this.#startScreen.activate()
  }

  #nextRound() {
    this.#state.round += 1
    this.#state.typedSequence = ''

    this.#generateSequence()

    this.#playScreen.displayRound()
    this.#playScreen.clearField()
  }

  #generateSequence() {
    this.#state.generatedSequence = ''

    for (let i = 0; i < this.#generatedSequenceLength; i++) {
      const randomIndex = Math.floor(
        Math.random() * this.#state.levelOfDifficulty.sequence.length
      )

      this.#state.generatedSequence +=
        this.#state.levelOfDifficulty.sequence[randomIndex].toUpperCase()
    }
  }

  /**
   * @param {string} symbol
   */
  async #addToTypedSequence(symbol) {
    this.#playScreen.addToField(symbol)

    const currentTypedSequence =
      `${this.#state.typedSequence}${symbol}`.toUpperCase()

    for (let i = 0; i < currentTypedSequence.length; i++) {
      const isValidSequence =
        currentTypedSequence[i] === this.#state.generatedSequence[i]

      if (!isValidSequence) {
        console.log(
          `FAIL ROUND ${this.#state.round}:
          ${currentTypedSequence} != ${this.#state.generatedSequence}`
        )

        this.#finishGame()
        return
      }
    }

    this.#state.typedSequence = currentTypedSequence

    if (this.#isTypedFullSequence) {
      console.log(
        `WIN ROUND ${this.#state.round}:
        ${currentTypedSequence} == ${this.#state.generatedSequence}`
      )

      if (this.#canDoNextRound) {
        this.#nextRound()
        await this.#playScreen.typeSequence()
      } else {
        console.log(`WIN GAME ON LEVEL ${this.#state.levelOfDifficulty.title}`)

        this.#finishGame()
      }
    }
  }

  /**
   * @returns {BaseScreen|StartScreen}
   */
  get #startScreen() {
    return this.#screens.find(
      (screen) => screen.constructor.name === 'StartScreen'
    )
  }

  /**
   * @returns {BaseScreen|PlayScreen}
   */
  get #playScreen() {
    return this.#screens.find(
      (screen) => screen.constructor.name === 'PlayScreen'
    )
  }

  /**
   * @returns {number}
   */
  get #generatedSequenceLength() {
    return this.#config.increasingSymbols * this.#state.round
  }

  /**
   * @returns {boolean}
   */
  get #isTypedFullSequence() {
    return (
      this.#state.typedSequence.length === this.#state.generatedSequence.length
    )
  }

  /**
   * @returns {boolean}
   */
  get #canDoNextRound() {
    return this.#state.round < this.#config.rounds
  }
}
