/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas 2021-2022
 *
 * @author Florian Reitz
 * @since Mayo 19 2022
 * @desc A class representing a deck
 *
 */

'use strict';

import {Card} from './Card.js';
import {CardHandlerInterface} from './CardHandlerInterface.js';
import {Hand} from './Hand.js';
import {PokerHand} from './PokerHand.js';

/** Class representing a deck in Poker
  *
  * @property {Card[]} #deck The suit of the card
 */

/** Creates a Deck */
export class Deck extends CardHandlerInterface {
  /** @private */
  #deck = [];

  /**
   * Create a Card
   * @constructor
   * @public
   */
  constructor() {
    super();
    for (const SUIT of Card.SUITS) {
      for (const RANK of Card.RANKS) {
        this.addCard(new Card(SUIT, RANK));
      }
    }
  }

  /** Returns the deck of the card
   * @return {Card[]} the deck
   */
  getDeck() {
    return this.#deck;
  }

  /** Adds a card to the deck
   * @param {Card} card the card to add
   */
  addCard(card) {
    this.#deck.push(card);
  }

  /** Returns the first card of the deck
   * @return {Card} the first card
   * @throws {RangeError} if deck is empty
   */
  popCard() {
    if (this.#deck.length === 0) throw new RangeError('Deck empty!');
    return this.#deck.pop();
  }


  /** Clears the deck
  * @return {Deck} the current Deck
  */
  clear() {
    this.#deck = [];
    return this;
  }

  /** Reverses the order of the deck
  * @return {Deck} the current Deck
  */
  reverse() {
    this.#deck = this.#deck.reverse();
    return this;
  }

  /* istanbul ignore next Ignore shuffle since its impossible to test */
  /** Shuffles the deck with the Fisher Yates algorithm
   * @return {Deck} the current Deck
  */
  shuffle() {
    let currentIndex = this.#deck.length;
    let randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [this.#deck[currentIndex], this.#deck[randomIndex]] = [
        this.#deck[randomIndex], this.#deck[currentIndex]];
    }
    return this;
  }

  /** Sorts the deck
    * @return {Deck} the current Deck
  */
  sort() {
    this.#deck.sort((a, b) => Card.compare(a, b));
    return this;
  }

  /** Deals Pokerhands out to the players
   *
   * @param {number} numberOfHands number of Hands
   * @param {number} numberOfCards numbers of cards per hand
   * @param {string} type the class to build the hand from
   * @return {Hand[]} the hands
   */
  dealHands(numberOfHands, numberOfCards, type) {
    const hands = [];
    for (let i = 1; i <= numberOfHands; i++) {
      let hand;
      switch (type) {
        case 'Poker':
          hand = new PokerHand(`Player_${i}`);
          break;
        default:
          hand = new Hand(`Player_${i}`);
      }
      this.moveCards(hand, numberOfCards);
      hands.push(hand);
    }
    return hands;
  }

  /** Returns every Card of the Deck
  * @function
  * @return {string} the deck
  */
  toString() {
    let deckString = '';
    for (const CARD of this.#deck) {
      deckString += CARD.toString() + '\n';
    }
    return deckString;
  }
}
