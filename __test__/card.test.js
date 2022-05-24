/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas 2021-2022
 *
 * @author Florian Reitz
 * @since Mayo 18 2022
 * @desc Tests for the Card class
 * @jest-environment jsdom
 *
 */

import {Card} from '../scripts/classes/Card.js';

describe('Card', () => {
  describe('Check if object is created correctly', () => {
    test('create Card', () => {
      const CARD = new Card();
      expect(CARD).toBeTruthy();
      expect(CARD.getRank()).toBe('2');
      expect(CARD.getSuit()).toBe('Clubs');
      expect(CARD.toString()).toBe('2 of Clubs');
    });

    test('create different card', () => {
      const CARD = new Card('Hearts', '4');
      expect(CARD).toBeTruthy();
      expect(CARD.getRank()).toBe('4');
      expect(CARD.getSuit()).toBe('Hearts');
      expect(CARD.toString()).toBe('4 of Hearts');
    });

    test('create different card with symbol', () => {
      const CARD = new Card('Spades', 'Ace');
      expect(CARD).toBeTruthy();
      expect(CARD.getRank()).toBe('Ace');
      expect(CARD.getSuit()).toBe('Spades');
      expect(CARD.toString()).toBe('Ace of Spades');
    });


    test('create invalid cards', () => {
      expect(() => new Card('Hearts', '-2')).toThrow(RangeError);
      expect(() => new Card('Barts', '2')).toThrow(RangeError);
    });
  });

  describe('Check if the compare functions correctly', () => {
    test('check comparison with suits', () => {
      const CARD = new Card('Clubs', 'Ace');
      const CARD_TWO = new Card('Hearts', '2');

      expect(Card.compare(CARD, CARD_TWO)).toBe(-1);
      expect(Card.compare(CARD_TWO, CARD)).toBe(1);
    });

    test('check comparison with rank', () => {
      const CARD = new Card('Clubs', 'Ace');
      const CARD_TWO = new Card('Clubs', '2');

      expect(Card.compare(CARD, CARD_TWO)).toBe(1);
      expect(Card.compare(CARD_TWO, CARD)).toBe(-1);
    });

    test('check same card', () => {
      const CARD = new Card('Clubs', 'Ace');
      const CARD_TWO = new Card('Clubs', 'Ace');

      expect(Card.compare(CARD, CARD_TWO)).toBe(0);
    });
  });

  describe('Check if the compareRankFirst functions correctly', () => {
    test('check comparison with suits', () => {
      const CARD = new Card('Clubs', 'Ace');
      const CARD_TWO = new Card('Clubs', '2');

      expect(Card.compareRankFirst(CARD, CARD_TWO)).toBe(1);
      expect(Card.compareRankFirst(CARD_TWO, CARD)).toBe(-1);
    });

    test('check comparison with rank', () => {
      const CARD = new Card('Clubs', 'Ace');
      const CARD_TWO = new Card('Hearts', 'Ace');

      expect(Card.compareRankFirst(CARD, CARD_TWO)).toBe(-1);
      expect(Card.compareRankFirst(CARD_TWO, CARD)).toBe(1);
    });

    test('check same card', () => {
      const CARD = new Card('Clubs', 'Ace');
      const CARD_TWO = new Card('Clubs', 'Ace');

      expect(Card.compareRankFirst(CARD, CARD_TWO)).toBe(0);
    });
  });

  describe('Check if the image is set correctly', () => {
    test('check image', () => {
      const CARD = new Card('Clubs', 'Ace');
      expect(CARD.getImageString()).toBe('AC.png');
    });
  });

  describe('Check if the image is set with hidden', () => {
    test('check image', () => {
      const CARD = new Card('Clubs', 'Ace');
      CARD.swapHidden();
      expect(CARD.getImageString()).toBe('purple_back.png');
    });
  });
});
