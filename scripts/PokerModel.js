/* istanbul ignore file */
/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas 2021-2022
 *
 * @author Florian Reitz
 * @since Mayo 18 2022
 * @desc A class representing a the View for the Poker Game
 *
 */

'use strict';

import {Deck} from './classes/Deck.js';
import {PokerHand} from './classes/PokerHand.js';

/** Class representing a PokerModel
 *
 * @property {Deck} #deck The deck of cards
 * @poperty {Hand[]} #hands
*/
export class PokerModel {
  #gameType;
  #deck;
  #numberOfCards;
  #hands = [];

  /**
    * Create a PokerModel
    * @constructor
    * @public
    * @param {string} gameType - The Gametype
    * @param {number} numberOfCards - Number of Cards
    */
  constructor(gameType = 'Poker', numberOfCards = 5) {
    this.#gameType = gameType;
    this.#deck = new Deck().shuffle();
    this.#numberOfCards = numberOfCards;
  }

  /** Manages hand
    * @param {string} playerID The id of the player
    * @return {Card[]} the cards
   */
  manageHand(playerID) {
    const hand = this.#hands.find((hand) => hand.getLabel() === playerID);

    if (hand == null) {
      return this.#dealHand(playerID);
    } else {
      return this.#drawNewWithHold(playerID);
    }
  }

  /** Deals new Hand
    * @param {string} id The id of the player
    * @return {PokerHand} the hand
    */
  #dealHand(id) {
    for (let i = 0; i < this.#hands.length; i++) {
      if (this.#hands[i].getLabel(id) === id) {
        this.#hands[i].moveCards(this.#deck, this.#numberOfCards);
        this.#hands.splice(i, 1);
        this.#deck.shuffle();
      }
    }

    const HAND =
      this.#deck.dealHands(1, this.#numberOfCards, this.#gameType)[0];
    HAND.setLabel(id);
    this.#hands.push(HAND);

    return HAND;
  };

  /** Draws new cards when holding
    * @param {string} playerID The id of the player
    * @return {PokerHand} the hand
    */
  #drawNewWithHold(playerID) {
    const hand = this.#hands.find((hand) => hand.getLabel() === playerID);
    const holdStatus = hand.getHoldStatus();

    for (let i = 0; i < holdStatus.length; i++) {
      if (!holdStatus[i]) {
        hand.replaceCard(i, this.#deck.popCard());
      } else {
        const card = hand.getHand()[i];
        if (card.getHidden()) card.swapHidden();
      }
    }

    hand.clearHoldStatus();
    return hand;
  };

  /** Hides the player hands
    * @param {string} id The id of the element
    * @return {PokerHand} the hand
    */
  hidePlayer(id) {
    const hand = this.#hands.find((hand) => hand.getLabel() === id);

    for (const CARD of hand.getHand()) {
      CARD.swapHidden();
    }

    return hand;
  };

  /** Holds the given card
    * @param {string} playerID The player id
    * @param {number} index The index of the card
    * @return {PokerHand} the hand
    */
  holdCard(playerID, index) {
    const hand = this.#hands.find((hand) => hand.getLabel() === playerID);
    hand.setHoldStatus(index, !hand.getHoldStatus()[index]);
    return hand;
  }


  /** Handles winning
   *
   * @param {string} type type of event
   * @return {string | boolean} return of handler
   */
  handleWinning(type) {
    if (type === 'win') {
      return this.#checkWinner();
    } else if (type === 'reset') {
      return this.#resetGame();
    } else {
      return 'Unknown Winning Type!';
    }
  }

  /** Resets the game
   *  @return {boolean} if reset is succesful
   */
  #resetGame() {
    this.#deck = new Deck().shuffle();
    this.#hands = [];
    return true;
  }

  /** Calculates the current winner
   * @return {string} the name of the winner
   */
  #checkWinner() {
    let winner = null;
    let currentHighScore = -1;
    for (const HAND of this.#hands) {
      const currentScore = HAND.classify();
      if (currentScore > currentHighScore) {
        currentHighScore = currentScore;
        winner = HAND;
      } else if (currentScore === currentHighScore) {
        const currentHandScore = HAND.getCardScore(currentScore);
        const winnerHandScore = winner.getCardScore(currentHighScore);
        if (currentHandScore > winnerHandScore) {
          winner = HAND;
        } else if (currentHandScore === winnerHandScore) {
          return `Draw with ${PokerHand.WIN_TYPES[currentHighScore]}`;
        }
      }
    }
    if (winner === null) {
      return `No Winner yet!`;
    }
    return `${winner.getLabel()} is the Winner ` +
      `with a ${PokerHand.WIN_TYPES[currentHighScore]}!`;
  }
}

