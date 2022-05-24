/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas 2021-2022
 *
 * @author Florian Reitz
 * @since Mayo 19 2022
 * @desc Tests for the Deck class
 * @jest-environment jsdom
 *
 */

import {Deck} from '../scripts/classes/Deck.js';
import {Card} from '../scripts/classes/Card.js';
import {Hand} from '../scripts/classes/Hand.js';
import {PokerHand} from '../scripts/classes/PokerHand.js';

describe('Deck', () => {
  describe('Check if object is created correctly', () => {
    test('create Deck', () => {
      const DECK = new Deck();
      expect(DECK).toBeTruthy();
      expect(DECK.getDeck().length).toBe(52);
    });
  });

  describe('Check if the pop function works correctly', () => {
    test('check pop type', () => {
      const DECK = new Deck();
      const CARD = DECK.popCard();
      expect(CARD).toBeInstanceOf(Card);
    });

    test('check pop with null', () => {
      const DECK = new Deck();
      DECK.clear();
      expect(() => DECK.popCard()).toThrow(RangeError);
    });

    test('check pop with one card', () => {
      const DECK = new Deck();
      DECK.clear().addCard(new Card('Spades', 'Ace'));
      const CARD = DECK.popCard();
      expect(CARD.toString()).toBe('Ace of Spades');
    });
  });


  describe('Check if the sort sorts correctly', () => {
    test('check that highest card ist first', () => {
      const DECK = new Deck();
      DECK.sort();
      expect(DECK.popCard().toString()).toBe('Ace of Spades');
    });

    test('check that lowest card ist last', () => {
      const DECK = new Deck();
      DECK.sort().reverse();
      const CARD = DECK.popCard();
      expect(CARD.toString()).toBe('2 of Clubs');
    });
  });

  describe('Check if the reverse function works as intended;', () => {
    test('check the array is reversed correctly', () => {
      const DECK = new Deck();
      DECK.clear();
      DECK.addCard(new Card('Spades', 'Ace'));
      DECK.addCard(new Card('Spades', '2'));
      DECK.reverse();
      expect(DECK.popCard().toString()).toBe('Ace of Spades');
    });
  });

  describe('Check toString()', () => {
    test('Check twoString with one element', () => {
      const DECK = new Deck();
      DECK.clear();
      DECK.addCard(new Card('Spades', 'Ace'));
      expect(DECK.toString()).toBe('Ace of Spades\n');
    });

    test('Check twoString with two element', () => {
      const DECK = new Deck();
      DECK.clear();
      DECK.addCard(new Card('Spades', 'Ace'));
      DECK.addCard(new Card('Spades', '2'));
      expect(DECK.toString()).toBe('Ace of Spades\n2 of Spades\n');
    });
  });

  describe('Check dealHands()', () => {
    test('Check dealHands with one hands', () => {
      const DECK = new Deck();
      const HANDS = DECK.dealHands(1, 5);
      expect(HANDS.length).toBe(1);
      expect(HANDS[0].getHand().length).toBe(5);
    });
    test('Check dealHands with two hands', () => {
      const DECK = new Deck();
      const HANDS = DECK.dealHands(2, 7);
      expect(HANDS.length).toBe(2);
      expect(HANDS[0]).toBeInstanceOf(Hand);
      expect(HANDS[0].getHand().length).toBe(7);
    });
    test('Check dealHands with poker hands', () => {
      const DECK = new Deck();
      const HANDS = DECK.dealHands(2, 7, 'Poker');
      expect(HANDS.length).toBe(2);
      expect(HANDS[0].getHand().length).toBe(7);
      expect(HANDS[0]).toBeInstanceOf(PokerHand);
    });


    test('Check dealHands with empty deck', () => {
      const DECK = new Deck();
      DECK.clear();
      expect(() => DECK.dealHands(1, 1)).toThrow(RangeError);
    });
  });
});
