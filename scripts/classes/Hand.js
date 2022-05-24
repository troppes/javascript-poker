/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas 2021-2022
 *
 * @author Florian Reitz
 * @since Mayo 19 2022
 * @desc A class representing a hand
 *
 */

'use strict';
import {CardHandlerInterface} from './CardHandlerInterface.js';


/** Class representing a hand
  *
  * @property {string} #label the label
  * @property {number} #cardsToHave the cards to have
  * @property {Card[]} #hand The suit of the card
 */

/** Creates a Deck */
export class Hand extends CardHandlerInterface {
  /** @private */
  #label = '';
  #hand = [];

  /**
   * Create a Card
   * @constructor
   * @public
   * @param {string} label the label for the hand
   * @param {number} cardsToHave the cards to have on the hand
   */
  constructor(label) {
    super();
    this.#label = label;
  }

  /** Returns the hand
   * @return {Card[]} the hand
   */
  getHand() {
    return this.#hand;
  }

  /** Sets the hand
   * @param {Card[]} newHand the new hand
   */
  setHand(newHand) {
    this.#hand = newHand;
  };

  /** Sets the label of the hand
   * @param {string} name label
   */
  setLabel(name) {
    this.#label = name;
  }


  /** Returns the label of the hand
   * @return {string} the label
   */
  getLabel() {
    return this.#label;
  }

  /** Clears the hand
  * @return {Hand} the current Hand
  */
  clear() {
    this.#hand = [];
    return this;
  }

  /** Adds a card to the hand
   * @param {Card} card the card to add
   */
  addCard(card) {
    this.#hand.push(card);
  }

  /** Replaces a card on the hand
   * @param {number} index the index to replace
   * @param {Card} card the card to add
   */
  replaceCard(index, card) {
    this.#hand[index] = card;
  }

  /** Returns the first card of the deck
   * @return {Card} the first card
   * @throws {RangeError} if deck is empty
   */
  popCard() {
    if (this.#hand.length === 0) throw new RangeError('Hand empty!');
    return this.#hand.pop();
  }

  /** Returns every Card of the Deck
  * @function
  * @return {string} the deck
  */
  toString() {
    let handString = '';
    for (const CARD of this.#hand) {
      handString += CARD.toString() + '\n';
    }
    return handString;
  }
}
