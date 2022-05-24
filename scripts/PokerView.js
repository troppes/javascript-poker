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

/** Class representing a Poker View
 * @property {Node} #controlDiv the div with the controls
 * @property {Node} #playingFieldDiv the div with the playing field
 * @property {Node} #winTextDiv the div for the win text

 * @property {Node} #hideRow div for the hide event listener
 * @property {Node} #winRow div for the win event listener
 * @property {Node} #dealRow div for the deal event listener

 * @property {boolean} #roundEnded Boolean to indicate round status

*/

/** Creates a PokerView */
export class PokerView {
  /** @private */
  #controlDiv;
  #playingFieldDiv;
  #winTextDiv;

  #hideRow;
  #winRow;
  #dealRow;

  #roundEnded = false;

  /**
    * Create a PokerView
    * @constructor
    * @public
    * @param {string} playingFieldID - The id of the playingField
    * @param {string} controlID - The id of the control div
    */
  constructor(playingFieldID, controlID) {
    this.#playingFieldDiv = document.getElementById(playingFieldID);
    this.#controlDiv = document.getElementById(controlID);

    const parentDiv = this.#setupButtons();
    this.#controlDiv.appendChild(parentDiv);

    const playingField = this.#setupPlayingField();
    this.#playingFieldDiv.appendChild(playingField);
  }

  /** Setup for the player cards
   * @return {Node} parentDiv
  */
  #setupPlayingField() {
    const parentDiv = document.createElement('div');
    parentDiv.classList.add('pure-g', 'center');

    const player1 = document.createElement('div');
    player1.classList.add('pure-u-1');
    player1.id = 'Player1';

    const player2 = document.createElement('div');
    player2.classList.add('pure-u-1');
    player2.id = 'Player2';

    const winText = document.createElement('div');
    winText.classList.add('pure-u-1');
    winText.id = 'win-text';

    parentDiv.appendChild(player1);
    parentDiv.appendChild(winText);
    parentDiv.appendChild(player2);

    this.#winTextDiv = winText;

    return parentDiv;
  }

  /** Setup for the control buttons
   * @return {Node} parentDiv
  */
  #setupButtons() {
    const parentDiv = document.createElement('div');
    parentDiv.classList.add('pure-g', 'center');

    this.#hideRow = document.createElement('div');
    this.#hideRow.classList.add('pure-u-1', 'hide-control');

    this.#dealRow = document.createElement('div');
    this.#dealRow.classList.add('pure-u-1', 'deal-control');

    this.#winRow = document.createElement('div');
    this.#winRow.classList.add('pure-u-1', 'win-control');

    const dealPlayerOne = this.#createButton('Deal Player1', 'dp1', 'Player1');
    const deaPlayerTwo = this.#createButton('Deal Player2', 'dp2', 'Player2');

    const showHandOne = this.#createButton('Hide Player1', 'hp1', 'Player1');
    const showHandTwo = this.#createButton('Hide Player2', 'hp1', 'Player2');

    const checkWin = this.#createButton('Who won?', 'win');

    this.#dealRow.appendChild(dealPlayerOne);
    this.#dealRow.appendChild(deaPlayerTwo);

    this.#hideRow.appendChild(showHandOne);
    this.#hideRow.appendChild(showHandTwo);

    this.#winRow.appendChild(checkWin);

    parentDiv.appendChild(this.#dealRow);
    parentDiv.appendChild(this.#hideRow);
    parentDiv.appendChild(this.#winRow);

    return parentDiv;
  }

  /** Binds the deal buttons
   * @param {Function} handler
   */
  bindDealControl(handler) {
    this.#dealRow.addEventListener('click', async (event) => {
      event.target.textContent =
      'Change ' + event.target.dataset.playerID;
      event.target.disabled = true;
      let hand = null;
      try {
        hand = handler(event.target.dataset.playerID);
      } catch (error) {
        this.#displayWinText(error.message);
        this.#roundEnded = true;
      }
      if (hand) {
        await this.#displayCards(hand);
      }
      event.target.disabled = false;
    });
  }

  /** Binds the deal buttons
   * @param {Function} handler
   */
  bindHideControl(handler) {
    this.#hideRow.addEventListener('click', async (event) => {
      event.target.disabled = true;
      let hand = null;
      try {
        hand = handler(event.target.dataset.playerID);
      } catch (error) {
        this.#displayWinText('The hand has not been dealt!');
      }
      if (hand) {
        await this.#displayCards(hand);
      }
      event.target.disabled = false;
    });
  }

  /** Binds the win buttons
   * @param {Function} handler
   */
  bindWinControl(handler) {
    this.#winRow.addEventListener('click', (event) => {
      if (!this.#roundEnded) {
        this.#displayWinText(handler('win'));
        this.#roundEnded = true;
        event.target.textContent = 'New Game';
      } else {
        handler('reset');
        this.#roundEnded = false;
        this.#resetGame();
        event.target.textContent = event.target.dataset.originalName;
      }
    });
  }

  /** Resets the game stage
   */
  #resetGame() {
    this.#playingFieldDiv.innerHTML = '';

    const playingField = this.#setupPlayingField();
    this.#playingFieldDiv.appendChild(playingField);

    const dealButtons = this.#dealRow.querySelectorAll('button');
    for (const button of dealButtons) {
      button.textContent = button.dataset.originalName;
    }
  }

  /** Binds the hold function on the cards
   * @param {Function} handler
   */
  bindHoldControl(handler) {
    this.#playingFieldDiv.addEventListener('click', async (event) => {
      if (event.target.classList.contains('card')) {
        event.target.disabled = true;
        let hand = null;
        try {
          hand = handler(
              event.target.dataset.player,
              event.target.dataset.index,
          );
        } catch (error) {
          this.#displayWinText(error.message);
        }
        if (hand) {
          await this.#displayCards(hand);
        }
        event.target.disabled = false;
      }
    });
  }

  /** Displays the cards
   *
   * @param {Hand} hand the hand
   */
  async #displayCards(hand) {
    const player = document.getElementById(hand.getLabel());
    player.innerHTML = '';

    const cards = hand.getHand();
    const holdStatus = hand.getHoldStatus();
    for (let cardIndex = 0; cardIndex < cards.length; cardIndex++) {
      const image = await this.#createImageCard(
          cards[cardIndex],
          hand.getLabel(),
          cardIndex,
          holdStatus[cardIndex],
      );
      player.appendChild(image);
    }
  }

  /** Displays the Wintext
   *
   * @param {string} text
   */
  #displayWinText(text) {
    this.#winTextDiv.innerHTML = '';
    this.#winTextDiv.appendChild(document.createTextNode(text));
  }

  /** Creates the image element for a card
   * @param {Card} card the card to display
   * @param {string} playerID the id
   * @param {string | number} cardIndex the card index
   * @param {boolean} holdStatus the hold status;
   * @return {Image} the image
  */
  #createImageCard(card, playerID, cardIndex, holdStatus) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.addEventListener('load', () => resolve(img));
      img.addEventListener('error', (err) => reject(err));
      img.src = `./img/${card.getImageString()}`;
      img.alt = card.getImageString();
      img.dataset.player = playerID;
      img.dataset.index = cardIndex;
      img.dataset.card = card.getImageString();
      img.classList.add('card');
      if (holdStatus) img.classList.add('hold');
    });
  }

  /**
   * Create a designed button
   * @param {string} name name for the button
   * @param {string} id id for the button
   * @param {string} playerID id the the player
   * @return {Node} the button
   */
  #createButton(name, id, playerID) {
    const button = document.createElement('button');
    button.textContent = name;
    button.dataset.originalName = name;
    button.id = id;
    button.dataset.playerID = playerID;
    button.classList.add('pure-button');

    return button;
  }
}
