import { GameConfig } from 'service/model/GameConfig.js'
import { GameState } from 'service/model/GameState.js'
import { GameLevel } from 'service/model/GameLevel.js'
import { PlayScreen } from 'service/screen/PlayScreen.js'
import { StartScreen } from 'service/screen/StartScreen.js'

/**
 * @typedef {{
 *   attempts: GameConfig['attempts']
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
    attempts = 2,
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
      attempts,
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
          await this.#repeatRound()
        },

        onNewGame: () => {
          this.#finishGame()
        },

        onPress: async (symbol) => {
          await this.#addToTypedSequence(symbol)
        },

        onNext: async () => {
          await this.#playNextRound()
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
    this.#state.attempt = 0
    this.#state.typedSequence = ''

    this.#startScreen.activate()
  }

  /**
   * @returns {Promise<void>}
   */
  async #playNextRound() {
    this.#nextRound()

    await this.#playScreen.typeSequence()
  }

  #nextRound() {
    this.#state.round += 1
    this.#state.attempt = 1
    this.#state.typedSequence = ''

    this.#generateSequence()

    this.#playScreen.displayRound()
    this.#playScreen.clearMessage()
    this.#playScreen.clearField()
    this.#playScreen.hideNextButton()

    this.#playScreen.repeatButton.enable()
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
   * @returns {Promise<void>}
   */
  async #repeatRound() {
    if (!this.#canDoAttempt) {
      return
    }

    this.#playScreen.clearMessage()
    this.#playScreen.clearField()

    this.#playScreen.repeatButton.disable()

    await this.#playScreen.typeSequence()
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
        this.#state.attempt += 1

        if (!this.#canDoAttempt) {
          this.#playScreen.setMessage({
            type: 'error',
            message: 'Game over!'
          })

          console.log(
            `LOST GAME ON LEVEL ${this.#state.levelOfDifficulty.title}:
            ${currentTypedSequence} != ${this.#state.generatedSequence}`
          )

          this.#playScreen.repeatButton.disable()
        } else {
          this.#playScreen.setMessage({
            type: 'error',
            message: 'Round is failed'
          })

          console.log(
            `LOST ROUND ${this.#state.round}:
            ${currentTypedSequence} != ${this.#state.generatedSequence}`
          )
        }

        this.#playScreen.keyboard.disable()

        return
      }
    }

    this.#state.typedSequence = currentTypedSequence

    if (this.#state.isTypedFullSequence) {
      if (this.#canDoNextRound) {
        this.#playScreen.setMessage({
          type: 'success',
          message: 'Round is completed'
        })

        console.log(
          `WIN ROUND ${this.#state.round}:
        ${currentTypedSequence} == ${this.#state.generatedSequence}`
        )

        this.#playScreen.showNextButton()
      } else {
        this.#playScreen.setMessage({
          type: 'success',
          message: `You have won (${this.#state.levelOfDifficulty.title})!`
        })

        console.log(`WIN GAME ON LEVEL ${this.#state.levelOfDifficulty.title}`)
      }

      this.#playScreen.keyboard.disable()
      this.#playScreen.repeatButton.disable()
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
  get #canDoNextRound() {
    return this.#state.round < this.#config.rounds
  }

  /**
   * @returns {boolean}
   */
  get #canDoAttempt() {
    return this.#state.attempt <= this.#config.attempts
  }
}
