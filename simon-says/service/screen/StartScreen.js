import { BaseScreen } from 'service/screen/BaseScreen.js'
import { Button } from 'service/ui/Button.js'
import { DifficultyLevel } from 'service/DifficultyLevel.js'

export class StartScreen extends BaseScreen {
  customizeContainer() {
    const button = new Button({
      title: 'Start',
      onClick() {
        console.log('start')
      }
    })

    this.$container.appendChild(button.$element)

    const level = new DifficultyLevel({
      levelsOfDifficulty: this.levelsOfDifficulty,
      state: this.state
    })

    this.$container.append(...level.$elements)
  }
}
