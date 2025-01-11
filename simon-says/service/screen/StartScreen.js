import { BaseScreen } from 'service/screen/BaseScreen.js'
import { Button } from 'service/ui/Button.js'
import { DifficultyLevel } from 'service/DifficultyLevel.js'
import { Keyboard } from 'service/Keyboard.js'

export class StartScreen extends BaseScreen {
  /**
   * @type {HTMLDivElement}
   * @private
   */
  $keyboardContainer = document.createElement('div')

  customizeContainer() {
    const startButton = new Button({
      title: 'Start',
      onClick() {
        console.log('start')
      }
    })

    const keyboard = new Keyboard({
      sequence: this.state.levelOfDifficulty.sequence,
      onPress: (symbol) => {
        console.log(symbol)
      }
    })

    const level = new DifficultyLevel({
      levelsOfDifficulty: this.levelsOfDifficulty,
      state: this.state,
      onChange: (levelOfDifficulty) => {
        keyboard.setSequence(levelOfDifficulty.sequence)
        this.$keyboardContainer.replaceChildren(...keyboard.$elements)
      }
    })

    this.$container.appendChild(startButton.$element)
    this.$container.append(...level.$elements)

    this.$container.appendChild(this.$keyboardContainer)
    this.$keyboardContainer.replaceChildren(...keyboard.$elements)
  }
}
