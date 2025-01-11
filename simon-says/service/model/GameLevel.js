/**
 * @typedef {{
 *   name: string
 *   sequence: string
 *   title: string
 * }} GameLevelProps
 */

export class GameLevel {
  /**
   * @type {string}
   */
  name

  /**
   * @type {string}
   */
  title

  /**
   * @type {string}
   */
  sequence

  /**
   * @param {GameLevelProps} props
   */
  constructor({ name, sequence, title }) {
    this.name = name
    this.sequence = sequence
    this.title = title
  }
}
