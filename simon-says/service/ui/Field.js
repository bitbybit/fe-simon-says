export class Field {
  /**
   * @type {string}
   */
  #value = ''

  /**
   * @type {HTMLInputElement}
   */
  $element = document.createElement('input')

  constructor() {
    this.$element.setAttribute('type', 'text')
    this.$element.setAttribute('readonly', 'readonly')
    this.$element.setAttribute('disabled', 'disabled')

    this.$element.classList.add('form-control')

    this.$element.value = this.#value
  }

  /**
   * @param {string} value
   */
  addValue(value) {
    this.#value += value

    this.$element.value = this.#value
  }

  clear() {
    this.#value = ''

    this.$element.value = this.#value
  }
}
