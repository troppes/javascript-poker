/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas 2021-2022
 *
 * @author Florian Reitz
 * @since Mayo 19 2022
 * @desc Tests for the Hand class
 * @jest-environment jsdom
 *
 */

import {Hand} from '../scripts/classes/Hand.js';
import {Card} from '../scripts/classes/Card.js';

describe('Hand', () => {
  describe('Check if object is created correctly', () => {
    test('create Hand', () => {
      const NAME = 'new Hand';
      const HAND = new Hand(NAME);
      expect(HAND).toBeTruthy();
      expect(HAND.getHand().length).toBe(0);
      expect(HAND.getLabel()).toBe(NAME);

      const NAME_TWO = 'new Hand 2';
      HAND.setLabel(NAME_TWO);
      expect(HAND.getLabel()).toBe(NAME_TWO);
    });
  });

  describe('Check if the add function works correctly', () => {
    test('check add with one', () => {
      const HAND = new Hand();
      expect(HAND.getHand().length).toBe(0);

      HAND.addCard(new Card('Spades', 'Ace'));

      expect(HAND.getHand().length).toBe(1);
    });

    test('check add with 2 cards', () => {
      const HAND = new Hand();
      expect(HAND.getHand().length).toBe(0);

      HAND.addCard(new Card('Spades', 'Ace'));
      HAND.addCard(new Card('Spades', '2'));

      expect(HAND.getHand().length).toBe(2);
    });
  });

  describe('Check if the replace function works correctly', () => {
    test('check replace with one', () => {
      const HAND = new Hand();
      expect(HAND.getHand().length).toBe(0);
      HAND.addCard(new Card('Spades', 'Ace'));

      expect(HAND.getHand().length).toBe(1);

      HAND.replaceCard(0, new Card('Spades', '2'));

      expect(HAND.getHand().length).toBe(1);
      expect(HAND.popCard().toString()).toBe('2 of Spades');
    });
  });

  describe('Check if the pop function works correctly', () => {
    test('check add with one', () => {
      const HAND = new Hand();
      HAND.addCard(new Card('Spades', 'Ace'));
      expect(HAND.popCard().toString()).toBe('Ace of Spades');
    });

    test('check add with 2 cards', () => {
      const HAND = new Hand();

      HAND.addCard(new Card('Spades', '2'));
      HAND.addCard(new Card('Spades', 'Ace'));

      expect(HAND.popCard().toString()).toBe('Ace of Spades');
    });

    test('check add with 0 cards', () => {
      const HAND = new Hand();

      expect(() => HAND.popCard()).toThrow(RangeError);
    });
  });

  describe('Check if the clear function works correctly', () => {
    test('check clear with 2 cards', () => {
      const HAND = new Hand();

      HAND.addCard(new Card('Spades', '2'));
      HAND.addCard(new Card('Spades', 'Ace'));

      HAND.clear();

      expect(HAND.getHand().length).toBe(0);
    });
  });

  describe('Check if the setHand function works correctly', () => {
    test('check setHand', () => {
      const HAND = new Hand();

      HAND.setHand([new Card('Spades', '2')]);

      expect(HAND.getHand().length).toBe(1);
      expect(HAND.getHand()[0].toString()).toBe('2 of Spades');
    });
  });

  describe('Check toString()', () => {
    test('Check twoString with one element', () => {
      const HAND = new Hand();
      HAND.addCard(new Card('Spades', 'Ace'));
      expect(HAND.toString()).toBe('Ace of Spades\n');
    });

    test('Check twoString with two elements', () => {
      const HAND = new Hand();
      HAND.addCard(new Card('Spades', 'Ace'));
      HAND.addCard(new Card('Spades', '2'));
      expect(HAND.toString()).toBe('Ace of Spades\n2 of Spades\n');
    });

    test('Check twoString with 0 elements', () => {
      const HAND = new Hand();
      expect(HAND.toString()).toBe('');
    });
  });
});
