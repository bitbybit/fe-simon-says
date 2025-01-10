import { Button } from 'service/ui/Button.js'

/**
 * @typedef {{
 *   onClick?: (value: SwitcherOption['value']) => {}
 *   title: string
 *   value: string
 * }} SwitcherOption
 */

/**
 * @typedef {{
 *   options: SwitcherOption[]
 *   value: SwitcherOption['value']
 * }} SwitcherProps
 */

export class Switcher {
  /**
   * @type {Button[]}
   */
  buttons = []

  /**
   * @typedef {SwitcherOption['value']}
   */
  value

  /**
   * @param {SwitcherProps} props
   */
  constructor({ onClick = () => {}, options, value }) {
    for (const { title, value } of options) {
      const button = new Button({
        title,
        onClick: () => {
          if (this.value === value) {
            return
          }

          this.#setValue(value)
          onClick(value)
        }
      })

      button.$element.dataset.value = value

      this.buttons.push(button)
    }

    this.#setValue(value)
  }

  /**
   * @param {SwitcherOption['value']} value
   */
  #setValue(value) {
    const selectedButton = this.buttons.find(
      ({ $element }) => $element.dataset.value === value
    )

    for (const button of this.buttons) {
      button.highlightOff()
    }

    selectedButton.highlightOn()

    this.value = value
  }
}
