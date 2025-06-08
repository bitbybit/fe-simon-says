/**
 * @typedef {{
 *   onClick?: (value: SwitcherOption['value']) => {}
 *   title: string
 *   value: string
 * }} SwitcherOptionProps
 */

export class SwitcherOption {
  /**
   * @type {string}
   */
  value

  /**
   * @type {string}
   */
  title

  /**
   * @type {(value: SwitcherOption['value']) => {}|undefined}
   */
  onClick

  /**
   * @param {SwitcherOptionProps} props
   */
  constructor({ onClick, title, value }) {
    this.onClick = onClick
    this.title = title
    this.value = value
  }
}
