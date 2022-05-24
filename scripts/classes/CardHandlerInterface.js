/* eslint-disable no-unused-vars */
/* istanbul ignore file */
/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas 2021-2022
 *
 * @author Florian Reitz
 * @since Mayo 19 2022
 * @desc A class representing a card handler interface
 *
 */

'use strict';

/** Interface representing a card handler
 * @interface
 */
export class CardHandlerInterface {
  /**
   * Create a Card
   * @constructor
   * @public
   */
  constructor() {
  }

  /** Adds a card to the handler
   * @param {Card} card the card to add
   */
  addCard(card) {
    throw new Error('You have to implement the method pushCard!');
  }

  /** Returns the first card of the handler */
  popCard() {
    throw new Error('You have to implement the method popCard!');
  }

  /** Clears the handler */
  clear() {
    throw new Error('You have to implement the method clear!');
  }

  /** Move Cards
   * @param {cardHandlerInterface} receiver the actor who recives the cards
   * @param {number} numberOfCards the number of cards
   */
  moveCards(receiver, numberOfCards) {
    for (let i = 0; i < numberOfCards; i++) {
      const card = this.popCard();
      if (card.getHidden()) card.swapHidden();
      receiver.addCard(card);
    }
  }
}
