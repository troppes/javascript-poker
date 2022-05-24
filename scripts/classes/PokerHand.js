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
import {Hand} from './Hand.js';
import {Card} from './Card.js';

/** Class representing a hand in Poker
  *
  * @property {Boolean[]} #cardsToHold the hold status of he cards
 */

/** Creates a Deck */
export class PokerHand extends Hand {
  /** @static */
  static WIN_TYPES = [
    'High Card', 'Pair', 'Two Pair',
    'Three of a Kind', 'Staight', 'Flush', 'Full House',
    'Four of a Kind', 'Straight Flush', 'Royal Flush',
  ];

  /** @private */
  #cardsToHold = [];

  /**
   * Create a Card
   * @constructor
   * @public
   * @param {label} label the label for the hand
   */
  constructor(label) {
    super(label);
  }

  /** Adds a card to the deck
   * @param {Card} card the card to add
   */
  addCard(card) {
    this.#cardsToHold.push(false);
    super.addCard(card);
  }

  /** Returns the hold status array
   * @return {Boolean[]} the hold status
   */
  getHoldStatus() {
    return this.#cardsToHold;
  }

  /** Returns the first card of the dekc
   * @return {Card} the first card
   */
  popCard() {
    this.#cardsToHold.pop();
    return super.popCard();
  }

  /** Sets status of card for specific index
   * @param {number} index to set value
   * @param {boolean} status true = hold
   */
  setHoldStatus(index, status) {
    this.#cardsToHold[index] = status;
  }

  /** Sorts the Hand by suit
  * @return {Hand} the current Hand
  */
  sortBySuit() {
    return this.getHand().sort((a, b) => Card.compare(a, b));
  }

  /** Sorts the Hand by Rank
  * @return {Hand} the current Rank
  */
  sortByRank() {
    return this.getHand().sort((a, b) => Card.compareRankFirst(a, b));
  }

  /** Reverses the hand
  * @return {Hand} the current Rank
  */
  reverse() {
    return this.getHand().reverse();
  }

  /** Clears the hand
  * @return {Hand} the current Hand
  */
  clear() {
    super.clear();
    this.#cardsToHold = [];
    return this;
  }

  /** Clears the holdstatus
  * @return {Hand} the current Hand
  */
  clearHoldStatus() {
    this.#cardsToHold = this.#cardsToHold.map(() => false);
    return this;
  }

  /** Checks if a specific numbers of pairs are here
   *
   * @param {number} numberOfPairs
   * @return {boolean} true if pairs are found false if not
   */
  #checkForPairs(numberOfPairs) {
    const CARDS = this.sortByRank();
    let pairCount = 0;

    for (let i = 0; i < CARDS.length - 1; i++) {
      if (CARDS[i].getRank() === CARDS[i + 1].getRank()) {
        pairCount++;
        i++; // To not let the counter count the same pair twice
      }
    }
    return pairCount >= numberOfPairs;
  }

  /** Checks if pair exists
   * @return {boolean} true if a pair was found
  */
  hasPair() {
    return this.#checkForPairs(1);
  }

  /** Checks if two pairs exist
   * @return {boolean} true if two pairs were found
  */
  hasTwoPair() {
    return this.#checkForPairs(2);
  }

  /** Checks if a three of a kind exists
   * @return {boolean} true if a three of a kind was found
  */
  hasThreeOfAKind() {
    const CARDS = this.sortByRank();

    for (let i = 0; i < CARDS.length - 2; i++) {
      if (CARDS[i].getRank() === CARDS[i + 1].getRank() &&
      CARDS[i + 1].getRank() === CARDS[i + 2].getRank()) {
        return true;
      }
    }
    return false;
  }

  /** Checks if a straight exists
   * @return {boolean} true if a straight was found
  */
  hasStraight() {
    const CARDS = this.sortByRank();

    let counter = 0;
    let currentValue = -1;

    for (let i = 0; i < CARDS.length; i++) {
      // -1 for checking first card, which is always part of straight
      if (currentValue === (CARDS[i].getValue() - 1) || currentValue === -1) {
        counter++;
      } else {
        counter = 0;
      }
      if (counter === 5) return true;

      currentValue = CARDS[i].getValue();
    }
    return false;
  }

  /** Checks if a flush exists
   * @return {boolean} true if a flush was found
  */
  hasFlush() {
    const CARDS = this.sortBySuit();

    let flush = true;

    for (let i = 0; i < CARDS.length - 1; i++) {
      if (CARDS[i].getSuit() !== CARDS[i + 1].getSuit()) {
        flush = false;
      }
    }

    return flush;
  }

  /** Checks if a full house exists
   * @return {boolean} true if a full house was found
  */
  hasFullHouse() {
    return this.hasTwoPair() && this.hasThreeOfAKind();
  }

  /** Checks if a four of a kind exists
   * @return {boolean} true if a four of a kind was found
  */
  hasFourOfAKind() {
    const CARDS = this.sortByRank();

    for (let i = 0; i < CARDS.length - 3; i++) {
      if (CARDS[i].getRank() === CARDS[i + 1].getRank() &&
      CARDS[i + 1].getRank() === CARDS[i + 2].getRank() &&
      CARDS[i + 2].getRank() === CARDS[i + 3].getRank()) {
        return true;
      }
    }
    return false;
  }

  /** Checks if a straight flush exists
   * @return {boolean} true if a straight flush was found
  */
  hasStraightFlush() {
    return this.hasFlush() && this.hasStraight();
  }

  /** Checks if a straight flush exists
   * @return {boolean} true if a straight flush was found
  */
  hasRoyalFlush() {
    const isRoyal = this.sortByRank()[0].getRank() === '10';

    return this.hasFlush() && this.hasStraight() && isRoyal;
  }

  /** Classifies the card score if two hands have the same
   * classification
   * @param {number} classification the classification of the hand
   * @return {number} the score of the current hand
   *
   */
  getCardScore(classification) {
    const CARDS = this.sortByRank().reverse();
    if (classification === 1 || classification === 2) {
      for (let i = 0; i < CARDS.length - 1; i++) {
        if (CARDS[i].getRank() === CARDS[i + 1].getRank()) {
          return CARDS[i].getValue();
        }
      }
    }
    if (classification === 3) {
      for (let i = 0; i < CARDS.length - 2; i++) {
        if (CARDS[i].getRank() === CARDS[i + 1].getRank() &&
        CARDS[i + 1].getRank() === CARDS[i + 2].getRank()) {
          return CARDS[i].getValue();
        }
      }
    }
    if (classification === 7) {
      for (let i = 0; i < CARDS.length - 3; i++) {
        if (CARDS[i].getRank() === CARDS[i + 1].getRank() &&
        CARDS[i + 1].getRank() === CARDS[i + 2].getRank() &&
        CARDS[i + 2].getRank() === CARDS[i + 3].getRank()) {
          return CARDS[i].getValue();
        }
      }
    } else {
      console.log(CARDS[0].toString());
      return CARDS[0].getValue();
    }
  }

  /** Classifies the worth of the hand
   *
   * @return {number} of winning hand, the higher the better
   */
  classify() {
    if (this.hasRoyalFlush()) return 9;
    if (this.hasStraightFlush()) return 8;
    if (this.hasFourOfAKind()) return 7;
    if (this.hasFullHouse()) return 6;
    if (this.hasFlush()) return 5;
    if (this.hasStraight()) return 4;
    if (this.hasThreeOfAKind()) return 3;
    if (this.hasTwoPair()) return 2;
    if (this.hasPair()) return 1;
    return 0;
  }
}
