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
 *
 * @property {number} #canvas The canvas to draw
 * @property {number} #ctx The context to draw
*/

/** Creates a PokerView */
export class PokerView {
  /** @private */
  #canvas = null;
  #ctx = null;
  #controlDiv;
  #imageWidth;
  #imageHeight;
  #stepSizeX;
  #borderDistance = 20;

  #hideRow;
  #winRow;
  #dealRow;


  /**
    * Create a PokerView
    * @constructor
    * @public
    * @param {string} canvasID - The id of the canvas
    * @param {string} canvasContainerId - The id of the canvas container
    * @param {string} controlID - The id of the control div
    */
  constructor(canvasID, canvasContainerId, controlID) {
    this.#canvas = document.getElementById(canvasID);
    this.#ctx = this.#canvas.getContext('2d');
    this.#controlDiv = document.getElementById(controlID);

    this.#setupCanvas(canvasContainerId);


    // Add listener for resizing
    window.addEventListener('resize', () => {
      this.#setupCanvas(canvasContainerId);
    });

    const parentDiv = this.#setupButtons();
    this.#controlDiv.appendChild(parentDiv);
  }

  /** Sets up canvas
   * @param {string} canvasContainerId canvas container id
  */
  #setupCanvas(canvasContainerId) {
    this.#canvas.width =
    document.getElementById(canvasContainerId).clientWidth;
    this.#canvas.height = screen.height * 0.7;

    this.#imageWidth = this.#canvas.width / 6;
    this.#imageHeight = this.#canvas.height / 3;
    this.#stepSizeX = this.#canvas.width / 5.5;
  };

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

    const dealPlayerOne = this.#createButton('Deal Hand 1', 'Player1');
    const deaPlayerTwo = this.#createButton('Deal Hand 2', 'Player2');

    const showHandOne = this.#createButton('Hide Hand 1', 'Player1');
    const showHandTwo = this.#createButton('Hide Hand 2', 'Player2');

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
    this.#dealRow.addEventListener('click', (event) => {
      const id = event.target.id;
      this.#displayCards(handler(id), id);
    });
  }

  /** Binds the deal buttons
   * @param {Function} handler
   */
  bindHideControl(handler) {
    this.#hideRow.addEventListener('click', (event) => {
      const id = event.target.id;
      this.#displayCards(handler(id), id);
    });
  }


  /** Binds the hold function on the cards
   * @param {Function} handler
   */
  bindHoldControl(handler) {
  }

  /** Binds the win buttons
   * @param {Function} handler
   */
  bindWinControl(handler) {
    this.#winRow.addEventListener('click', (event) => {
      this.#displayWinText(handler('win'));
    });
  }

  /** Displays the cards
   *
   * @param {Hand} hand
   */
  async #displayCards(hand) {
    const id = hand.getLabel();
    const cards = hand.getHand();

    let stepSize = this.#stepSizeX / 4;
    let yDistance;
    if (id === 'Player1') {
      yDistance = this.#borderDistance;
      this.#ctx.clearRect(0, yDistance,
          this.#canvas.width, yDistance + this.#imageHeight);
    } else {
      yDistance =
        this.#canvas.height - this.#borderDistance - this.#imageHeight;
      this.#ctx.clearRect(0, yDistance,
          this.#canvas.width, yDistance + this.#imageHeight);
    }
    for (const card of cards) {
      const image = await this.#createImageCard(card, id);
      this.#ctx.drawImage(image,
          stepSize, yDistance,
          this.#imageWidth, this.#imageHeight);
      stepSize += this.#stepSizeX;
    }
  }

  /** Displays the Wintext
   *
   * @param {string} text
   */
  #displayWinText(text) {
    this.#ctx.clearRect(0, this.#canvas.height / 2 - 30,
        this.#canvas.width, 60);

    this.#ctx.save();
    this.#ctx.translate(this.#canvas.width / 2, this.#canvas.height / 2);
    this.#ctx.font = '30px Arial';
    this.#ctx.textAlign = 'center';

    this.#ctx.fillText(text, 0, 0);
    this.#ctx.fill();
    this.#ctx.stroke();
    this.#ctx.restore();
  }

  /** Creates the image element for a card
   * @param {Card} card the card to display
   * @param {string} id the id
   * @return {Image} the image
  */
  #createImageCard(card, id) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.addEventListener('load', () => resolve(img));
      img.addEventListener('error', (err) => reject(err));
      img.src = `./img/${card.getImageString()}`;
      img.alt = card.getImageString();
      img.dataset.player = id;
      img.dataset.card = card.getImageString;
      img.classList.add('card');
    });
  }

  /**
   * Create a designed button
   * @param {string} name name for the button
   * @param {string} id id for the button
   * @return {Node} the button
   */
  #createButton(name, id) {
    const button = document.createElement('button');
    button.innerHTML = name;
    button.id = id;
    button.style.width = '150px';
    button.style.height = '40px';
    button.classList.add('pure-button');

    return button;
  }
}
