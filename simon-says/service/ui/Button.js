/**
 * @typedef {{
 *   title: string
 *   onClick?: (e: Event) => {}
 * }} ButtonProps
 */

export class Button {
  /**
   * @type {HTMLButtonElement}
   */
  $element = document.createElement('button')

  /**
   * @param {ButtonProps} props
   */
  constructor({ title, onClick = () => {} }) {
    this.$element.classList.add('btn')
    this.$element.classList.add('btn-primary')

    this.$element.innerText = title

    this.$element.addEventListener('click', onClick)
  }

  disable() {
    this.$element.setAttribute('disabled', 'disabled')
  }

  enable() {
    this.$element.removeAttribute('disabled')
  }

  highlightOn() {
    this.$element.classList.remove('btn-primary')
    this.$element.classList.add('btn-info')
  }

  highlightOff() {
    this.$element.classList.remove('btn-info')
    this.$element.classList.add('btn-primary')
  }

  /**
   * @returns {boolean}
   */
  get isDisabled() {
    return this.$element.hasAttribute('disabled')
  }
}
