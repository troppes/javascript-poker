/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas 2021-2022
 *
 * @author Florian Reitz
 * @since Mayo 18 2022
 * @desc A class representing a card
 *
 */

'use strict';

/** Class representing a card in Poker
  *
  * @property {string} #suit The suit of the card
  * @property {string} #value The value of the card
  * @property {Image} #suit The image of the card

 */

/** Creates a Card */
export class Card {
  /** @static */
  static SUITS = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
  static RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10',
    'Jack', 'Queen', 'King', 'Ace'];

  /** @private */
  #suit = null;
  #rank = null;
  #imageString = null;
  #value = null;
  #hidden = false;

  /**
   * Create a Card
   * @constructor
   * @public
   * @param {string} suit - The suit of the card
   * @param {string} rank - The rank of the card
   * @throws {RangeError} When suit or rank are unknown
   */
  constructor(suit = 'Clubs', rank = '2') {
    if (Card.SUITS.includes(suit)) {
      this.#suit = suit;
    } else {
      throw new RangeError('This suit is not known');
    }

    if (Card.RANKS.includes(rank)) {
      this.#rank = rank;
    } else {
      throw new RangeError('This rank is not known');
    }

    if (rank === '10') {
      this.#imageString = `${rank + suit.charAt(0)}.png`;
    } else {
      this.#imageString = `${rank.charAt(0) + suit.charAt(0)}.png`;
    }
    this.#value = Card.RANKS.indexOf(this.#rank);
  }

  /** Returns the image of the card
   * @return {Image} the image
   */
  getImageString() {
    if (this.#hidden) return `purple_back.png`;
    return this.#imageString;
  }

  /**
   * Swaps the hidden status
   */
  swapHidden() {
    this.#hidden = !this.#hidden;
  }

  /** Returns the hidden status
   * @return {boolean} the hidden status
   */
  getHidden() {
    return this.#hidden;
  }

  /** Returns the suit of the card
   * @return {string} the suit
   */
  getSuit() {
    return this.#suit;
  }

  /** Returns the rank of the card
   * @return {string} the rank
   */
  getRank() {
    return this.#rank;
  }

  /** Returns the value of the card
   * @return {string} the value
   */
  getValue() {
    return this.#value;
  }

  /** Compares the card to another card
   *
   * @param {Card} card
   * @param {Card} otherCard
   * @return {number} 1 if the first card is higher | 0 if same | -1 if smaller
   */
  static compare(card, otherCard) {
    const cardSuitValue = Card.SUITS.indexOf(card.getSuit());
    const otherCardSuitValue = Card.SUITS.indexOf(otherCard.getSuit());

    if (cardSuitValue > otherCardSuitValue) {
      return 1;
    } else if (cardSuitValue === otherCardSuitValue) {
      const cardRankValue = Card.RANKS.indexOf(card.getRank());
      const otherCardRankValue = Card.RANKS.indexOf(otherCard.getRank());

      if (cardRankValue > otherCardRankValue) {
        return 1;
      } else if (cardRankValue === otherCardRankValue) {
        return 0;
      }
    }
    return -1;
  }

  /** Compares the card to another card
   *
   * @param {Card} card
   * @param {Card} otherCard
   * @return {number} 1 if the first card is higher | 0 if same | -1 if smaller
   */
  static compareRankFirst(card, otherCard) {
    const cardRankValue = Card.RANKS.indexOf(card.getRank());
    const otherCardRankValue = Card.RANKS.indexOf(otherCard.getRank());

    if (cardRankValue > otherCardRankValue) {
      return 1;
    } else if (cardRankValue === otherCardRankValue) {
      const cardSuitValue = Card.SUITS.indexOf(card.getSuit());
      const otherCardSuitValue = Card.SUITS.indexOf(otherCard.getSuit());

      if (cardSuitValue > otherCardSuitValue) {
        return 1;
      } else if (cardSuitValue === otherCardSuitValue) {
        return 0;
      }
    }
    return -1;
  }


  /** Returns the card
  * @function
  * @return {string} name and type
  */
  toString() {
    return `${this.#rank} of ${this.#suit}`;
  }
}
