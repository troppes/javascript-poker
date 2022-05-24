/* istanbul ignore file */
/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas 2021-2022
 *
 * @author Florian Reitz
 * @since Mayo 18 2022
 * @desc A class representing a the Controller for the Poker Game
 *
 */

'use strict';

/** Class representing a PokerController
    * @property {Deck} #deck The deck of cards
    * @property {PokerView} #pokerView The view
   */

/** Creates a PokerController */
export class PokerController {
  #pokerModel;
  #pokerView;

  /**
    * Create a PokerController
    * @constructor
    * @public
    * @param {PokerModel} pokerModel - The poker model
    * @param {PokerView} pokerView - The poker view
    */
  constructor(pokerModel, pokerView) {
    this.#pokerView = pokerView;
    this.#pokerModel = pokerModel;

    // Bind
    this.#pokerView.bindDealControl((id) => this.handleDealControl(id));
    this.#pokerView.bindWinControl((type) => this.handleWinControl(type));
    this.#pokerView.bindHideControl((id) => this.handleHideControl(id));
    this.#pokerView.bindHoldControl((playerID, index) => {
      return this.handleHoldControl(playerID, index);
    });
  }

  /** Function to handle dealing
   * @param {string} id The id of the element
   * @return {Card[]} the cards to display
   */
  handleDealControl(id) {
    return this.#pokerModel.manageHand(id);
  };

  /** Function handle winning
   * @param {string} type type of event
   * @return {string} the winner string
   */
  handleWinControl(type) {
    return this.#pokerModel.handleWinning(type);
  };

  /** Function handle hiding
   * @param {string} id The id of the element
   * @return {Card[]} the cards to display
   */
  handleHideControl(id) {
    return this.#pokerModel.hidePlayer(id);
  };

  /** Function to handle hold
   * @param {string} playerID The id of the player
   * @param {number} index the index of the card
   * @return {Card[]} the cards to display
   */
  handleHoldControl(playerID, index) {
    return this.#pokerModel.holdCard(playerID, index);
  };
}
