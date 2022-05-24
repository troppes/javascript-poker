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

import {PokerHand} from '../scripts/classes/PokerHand.js';
import {Card} from '../scripts/classes/Card.js';

describe('Hand', () => {
  describe('Check if object is created correctly', () => {
    test('create Hand', () => {
      const NAME = 'new Hand';
      const HAND = new PokerHand(NAME);
      expect(HAND).toBeTruthy();
      expect(HAND.getHoldStatus().length).toBe(0);
      expect(HAND.getLabel()).toBe(NAME);
    });
  });

  describe('Check if the add function works correctly', () => {
    test('check add with one', () => {
      const HAND = new PokerHand();
      expect(HAND.getHand().length).toBe(0);

      HAND.addCard(new Card('Spades', 'Ace'));

      expect(HAND.getHand().length).toBe(1);
      expect(HAND.getHoldStatus().length).toBe(1);
    });

    test('check add with 2 cards', () => {
      const HAND = new PokerHand();
      expect(HAND.getHand().length).toBe(0);
      expect(HAND.getHoldStatus().length).toBe(0);


      HAND.addCard(new Card('Spades', 'Ace'));
      HAND.addCard(new Card('Spades', '2'));

      expect(HAND.getHand().length).toBe(2);
      expect(HAND.getHoldStatus().length).toBe(2);
    });
  });

  describe('Check if the pop function works correctly', () => {
    test('check add with one', () => {
      const HAND = new PokerHand();
      HAND.addCard(new Card('Spades', 'Ace'));
      expect(HAND.getHoldStatus().length).toBe(1);
      expect(HAND.popCard().toString()).toBe('Ace of Spades');
      expect(HAND.getHoldStatus().length).toBe(0);
    });

    test('check add with 2 cards', () => {
      const HAND = new PokerHand();

      HAND.addCard(new Card('Spades', '2'));
      HAND.addCard(new Card('Spades', 'Ace'));

      expect(HAND.getHoldStatus().length).toBe(2);
      expect(HAND.popCard().toString()).toBe('Ace of Spades');
      expect(HAND.getHoldStatus().length).toBe(1);
    });

    test('check add with 0 cards', () => {
      const HAND = new PokerHand();

      expect(() => HAND.popCard()).toThrow(RangeError);
    });
  });

  describe('Check if the clear function works correctly', () => {
    test('check clear with 2 cards', () => {
      const HAND = new PokerHand();

      HAND.addCard(new Card('Spades', '2'));
      HAND.addCard(new Card('Spades', 'Ace'));
      expect(HAND.getHoldStatus().length).toBe(2);
      HAND.clear();
      expect(HAND.getHand().length).toBe(0);
      expect(HAND.getHoldStatus().length).toBe(0);
    });
  });

  describe('Check if the setHoldStatus function works correctly', () => {
    test('check setHoldStatus', () => {
      const HAND = new PokerHand();

      HAND.addCard(new Card('Spades', '2'));
      HAND.setHoldStatus(0, true);
      expect(HAND.getHoldStatus().length).toBe(1);
      expect(HAND.getHoldStatus()[0]).toBe(true);
    });
  });

  describe('Check if the clearHoldStatus function works correctly', () => {
    test('check clearHoldStatus', () => {
      const HAND = new PokerHand();

      HAND.addCard(new Card('Spades', '2'));
      HAND.setHoldStatus(0, true);
      HAND.clearHoldStatus();
      expect(HAND.getHoldStatus().length).toBe(1);
      expect(HAND.getHoldStatus()[0]).toBe(false);
    });
  });

  describe('Check if the sort by Rank correctly', () => {
    test('check that highest card ist first', () => {
      const HAND = new PokerHand();
      HAND.addCard(new Card('Spades', '2'));
      HAND.addCard(new Card('Spades', 'Ace'));
      HAND.addCard(new Card('Spades', '3'));
      HAND.addCard(new Card('Spades', '6'));
      HAND.addCard(new Card('Hearts', '2'));
      HAND.setHand(HAND.sortByRank());

      expect(HAND.popCard().toString()).toBe('Ace of Spades');
    });
  });

  describe('Check if the sort by Suit sorts correctly', () => {
    test('check that highest card ist first', () => {
      const HAND = new PokerHand();
      HAND.addCard(new Card('Clubs', '2'));
      HAND.addCard(new Card('Clubs', 'Ace'));
      HAND.addCard(new Card('Clubs', '3'));
      HAND.addCard(new Card('Clubs', '6'));
      HAND.addCard(new Card('Hearts', '2'));
      HAND.setHand(HAND.sortBySuit());
      expect(HAND.popCard().toString()).toBe('2 of Hearts');
    });
  });

  describe('Check if the reverse function works correctly', () => {
    test('check that the order is reversed', () => {
      const HAND = new PokerHand();
      HAND.addCard(new Card('Clubs', '2'));
      HAND.addCard(new Card('Clubs', 'Ace'));
      HAND.setHand(HAND.reverse());
      expect(HAND.toString()).toBe('Ace of Clubs\n2 of Clubs\n');
    });
  });

  describe('Check if the hasPair() function works correctly', () => {
    test('check hasPair positive', () => {
      const HAND = new PokerHand();

      HAND.addCard(new Card('Spades', '2'));
      HAND.addCard(new Card('Spades', 'Ace'));
      HAND.addCard(new Card('Spades', '3'));
      HAND.addCard(new Card('Spades', '6'));
      HAND.addCard(new Card('Hearts', '2'));

      expect(HAND.hasPair()).toBe(true);
    });

    test('check hasPair negative', () => {
      const HAND = new PokerHand();

      HAND.addCard(new Card('Spades', '5'));
      HAND.addCard(new Card('Spades', 'Ace'));
      HAND.addCard(new Card('Spades', '3'));
      HAND.addCard(new Card('Spades', '6'));
      HAND.addCard(new Card('Hearts', '2'));

      expect(HAND.hasPair()).toBe(false);
    });
  });

  describe('Check if the hasTwoPair() function works correctly', () => {
    test('check hasTwoPair positive', () => {
      const HAND = new PokerHand();

      HAND.addCard(new Card('Spades', '2'));
      HAND.addCard(new Card('Spades', 'Ace'));
      HAND.addCard(new Card('Spades', '3'));
      HAND.addCard(new Card('Diamonds', '3'));
      HAND.addCard(new Card('Hearts', '2'));

      expect(HAND.hasTwoPair()).toBe(true);
    });

    test('check hasTwoPair negative', () => {
      const HAND = new PokerHand();

      HAND.addCard(new Card('Spades', '5'));
      HAND.addCard(new Card('Spades', 'Ace'));
      HAND.addCard(new Card('Diamonds', '6'));
      HAND.addCard(new Card('Spades', '6'));
      HAND.addCard(new Card('Hearts', '2'));

      expect(HAND.hasTwoPair()).toBe(false);
    });
  });

  describe('Check if the hasThreeOfAKind() function works correctly', () => {
    test('check hasThreeOfAKind positive', () => {
      const HAND = new PokerHand();

      HAND.addCard(new Card('Spades', '2'));
      HAND.addCard(new Card('Spades', 'Ace'));
      HAND.addCard(new Card('Spades', '3'));
      HAND.addCard(new Card('Diamonds', '2'));
      HAND.addCard(new Card('Hearts', '2'));

      expect(HAND.hasThreeOfAKind()).toBe(true);
    });

    test('check hasThreeOfAKind negative', () => {
      const HAND = new PokerHand();

      HAND.addCard(new Card('Spades', '5'));
      HAND.addCard(new Card('Spades', 'Ace'));
      HAND.addCard(new Card('Diamonds', '6'));
      HAND.addCard(new Card('Spades', '6'));
      HAND.addCard(new Card('Hearts', '2'));

      expect(HAND.hasThreeOfAKind()).toBe(false);
    });
  });

  describe('Check if the hasStraight() function works correctly', () => {
    test('check hasStraight positive', () => {
      const HAND = new PokerHand();

      HAND.addCard(new Card('Spades', '2'));
      HAND.addCard(new Card('Spades', '6'));
      HAND.addCard(new Card('Spades', '3'));
      HAND.addCard(new Card('Diamonds', '4'));
      HAND.addCard(new Card('Hearts', '5'));

      expect(HAND.hasStraight()).toBe(true);
    });

    test('check hasStraight negative', () => {
      const HAND = new PokerHand();

      HAND.addCard(new Card('Spades', '5'));
      HAND.addCard(new Card('Spades', 'Ace'));
      HAND.addCard(new Card('Diamonds', '6'));
      HAND.addCard(new Card('Spades', '6'));
      HAND.addCard(new Card('Hearts', '2'));

      expect(HAND.hasStraight()).toBe(false);
    });

    test('check hasStraight overflow', () => {
      const HAND = new PokerHand();

      HAND.addCard(new Card('Spades', 'King'));
      HAND.addCard(new Card('Spades', 'Ace'));
      HAND.addCard(new Card('Diamonds', '3'));
      HAND.addCard(new Card('Spades', '4'));
      HAND.addCard(new Card('Hearts', '2'));

      expect(HAND.hasStraight()).toBe(false);
    });
  });

  describe('Check if the hasFlush() function works correctly', () => {
    test('check hasFlush positive', () => {
      const HAND = new PokerHand();

      HAND.addCard(new Card('Spades', '2'));
      HAND.addCard(new Card('Spades', 'Ace'));
      HAND.addCard(new Card('Spades', '3'));
      HAND.addCard(new Card('Spades', '4'));
      HAND.addCard(new Card('Spades', '5'));

      expect(HAND.hasFlush()).toBe(true);
    });

    test('check hasFlush negative', () => {
      const HAND = new PokerHand();

      HAND.addCard(new Card('Spades', '5'));
      HAND.addCard(new Card('Spades', 'Ace'));
      HAND.addCard(new Card('Diamonds', '6'));
      HAND.addCard(new Card('Spades', '6'));
      HAND.addCard(new Card('Hearts', '2'));

      expect(HAND.hasFlush()).toBe(false);
    });
  });

  describe('Check if the hasFullHouse() function works correctly', () => {
    test('check hasFullHouse positive', () => {
      const HAND = new PokerHand();

      HAND.addCard(new Card('Spades', '6'));
      HAND.addCard(new Card('Diamonds', '6'));
      HAND.addCard(new Card('Hearts', '6'));
      HAND.addCard(new Card('Hearts', 'King'));
      HAND.addCard(new Card('Spades', 'King'));

      expect(HAND.hasFullHouse()).toBe(true);
    });

    test('check hasFullHouse negative', () => {
      const HAND = new PokerHand();

      HAND.addCard(new Card('Spades', '5'));
      HAND.addCard(new Card('Spades', 'Ace'));
      HAND.addCard(new Card('Diamonds', '6'));
      HAND.addCard(new Card('Spades', '6'));
      HAND.addCard(new Card('Hearts', '2'));

      expect(HAND.hasFullHouse()).toBe(false);
    });
  });

  describe('Check if the hasFourOfAKind() function works correctly', () => {
    test('check hasFourOfAKind positive', () => {
      const HAND = new PokerHand();

      HAND.addCard(new Card('Spades', '5'));
      HAND.addCard(new Card('Diamonds', '5'));
      HAND.addCard(new Card('Hearts', '5'));
      HAND.addCard(new Card('Hearts', '2'));
      HAND.addCard(new Card('Clubs', '5'));

      expect(HAND.hasFourOfAKind()).toBe(true);
    });

    test('check hasFourOfAKind negative', () => {
      const HAND = new PokerHand();

      HAND.addCard(new Card('Spades', '5'));
      HAND.addCard(new Card('Spades', 'Ace'));
      HAND.addCard(new Card('Diamonds', '6'));
      HAND.addCard(new Card('Spades', '6'));
      HAND.addCard(new Card('Hearts', '2'));

      expect(HAND.hasFourOfAKind()).toBe(false);
    });
  });

  describe('Check if the hasStraightFlush() function works correctly', () => {
    test('check hasStraightFlush positive', () => {
      const HAND = new PokerHand();

      HAND.addCard(new Card('Diamonds', '7'));
      HAND.addCard(new Card('Diamonds', '8'));
      HAND.addCard(new Card('Diamonds', '9'));
      HAND.addCard(new Card('Diamonds', '10'));
      HAND.addCard(new Card('Diamonds', 'Jack'));

      expect(HAND.hasStraightFlush()).toBe(true);
    });

    test('check hasStraightFlush negative', () => {
      const HAND = new PokerHand();

      HAND.addCard(new Card('Spades', '7'));
      HAND.addCard(new Card('Diamonds', '8'));
      HAND.addCard(new Card('Hearts', '9'));
      HAND.addCard(new Card('Hearts', '10'));
      HAND.addCard(new Card('Clubs', 'Jack'));

      expect(HAND.hasStraightFlush()).toBe(false);
    });
  });

  describe('Check if the hasRoyalFlush() function works correctly', () => {
    test('check hasRoyalFlush positive', () => {
      const HAND = new PokerHand();

      HAND.addCard(new Card('Diamonds', '10'));
      HAND.addCard(new Card('Diamonds', 'Jack'));
      HAND.addCard(new Card('Diamonds', 'Queen'));
      HAND.addCard(new Card('Diamonds', 'King'));
      HAND.addCard(new Card('Diamonds', 'Ace'));

      expect(HAND.hasRoyalFlush()).toBe(true);
    });

    test('check hasRoyalFlush negative', () => {
      const HAND = new PokerHand();

      HAND.addCard(new Card('Diamonds', '7'));
      HAND.addCard(new Card('Diamonds', '8'));
      HAND.addCard(new Card('Diamonds', '9'));
      HAND.addCard(new Card('Diamonds', '10'));
      HAND.addCard(new Card('Diamonds', 'Jack'));

      expect(HAND.hasRoyalFlush()).toBe(false);
    });
  });

  describe('Check if the classify() function works correctly', () => {
    test('check hasRoyalFlush', () => {
      const HAND = new PokerHand();

      HAND.addCard(new Card('Diamonds', '10'));
      HAND.addCard(new Card('Diamonds', 'Jack'));
      HAND.addCard(new Card('Diamonds', 'Queen'));
      HAND.addCard(new Card('Diamonds', 'King'));
      HAND.addCard(new Card('Diamonds', 'Ace'));

      expect(HAND.classify()).toBe(9);
    });

    test('check hasStraightFlush', () => {
      const HAND = new PokerHand();

      HAND.addCard(new Card('Diamonds', '7'));
      HAND.addCard(new Card('Diamonds', '8'));
      HAND.addCard(new Card('Diamonds', '9'));
      HAND.addCard(new Card('Diamonds', '10'));
      HAND.addCard(new Card('Diamonds', 'Jack'));

      expect(HAND.classify()).toBe(8);
    });

    test('check hasFourOfAKind', () => {
      const HAND = new PokerHand();

      HAND.addCard(new Card('Spades', '5'));
      HAND.addCard(new Card('Diamonds', '5'));
      HAND.addCard(new Card('Hearts', '5'));
      HAND.addCard(new Card('Hearts', '2'));
      HAND.addCard(new Card('Clubs', '5'));

      expect(HAND.classify()).toBe(7);
    });

    test('check hasFullHouse', () => {
      const HAND = new PokerHand();

      HAND.addCard(new Card('Spades', '6'));
      HAND.addCard(new Card('Diamonds', '6'));
      HAND.addCard(new Card('Hearts', '6'));
      HAND.addCard(new Card('Hearts', 'King'));
      HAND.addCard(new Card('Spades', 'King'));

      expect(HAND.classify()).toBe(6);
    });

    test('check hasFlush ', () => {
      const HAND = new PokerHand();

      HAND.addCard(new Card('Spades', '2'));
      HAND.addCard(new Card('Spades', 'Ace'));
      HAND.addCard(new Card('Spades', '3'));
      HAND.addCard(new Card('Spades', '4'));
      HAND.addCard(new Card('Spades', '5'));

      expect(HAND.classify()).toBe(5);
    });

    test('check hasStraight ', () => {
      const HAND = new PokerHand();

      HAND.addCard(new Card('Spades', '2'));
      HAND.addCard(new Card('Spades', '6'));
      HAND.addCard(new Card('Spades', '3'));
      HAND.addCard(new Card('Diamonds', '4'));
      HAND.addCard(new Card('Hearts', '5'));

      expect(HAND.classify()).toBe(4);
    });

    test('check hasThreeOfAKind', () => {
      const HAND = new PokerHand();

      HAND.addCard(new Card('Spades', '2'));
      HAND.addCard(new Card('Spades', 'Ace'));
      HAND.addCard(new Card('Spades', '3'));
      HAND.addCard(new Card('Diamonds', '2'));
      HAND.addCard(new Card('Hearts', '2'));

      expect(HAND.classify()).toBe(3);
    });

    test('check hasTwoPair', () => {
      const HAND = new PokerHand();

      HAND.addCard(new Card('Spades', '2'));
      HAND.addCard(new Card('Spades', 'Ace'));
      HAND.addCard(new Card('Spades', '3'));
      HAND.addCard(new Card('Diamonds', '3'));
      HAND.addCard(new Card('Hearts', '2'));

      expect(HAND.classify()).toBe(2);
    });

    test('check hasPair', () => {
      const HAND = new PokerHand();

      HAND.addCard(new Card('Spades', '2'));
      HAND.addCard(new Card('Spades', 'Ace'));
      HAND.addCard(new Card('Spades', '3'));
      HAND.addCard(new Card('Spades', '6'));
      HAND.addCard(new Card('Hearts', '2'));

      expect(HAND.classify()).toBe(1);
    });


    test('check high card', () => {
      const HAND = new PokerHand();

      HAND.addCard(new Card('Spades', '2'));
      HAND.addCard(new Card('Spades', '4'));
      HAND.addCard(new Card('Spades', '6'));
      HAND.addCard(new Card('Spades', 'Jack'));
      HAND.addCard(new Card('Hearts', 'King'));

      expect(HAND.classify()).toBe(0);
    });
  });


  describe('Check if the getCardScore() function works correctly', () => {
    test('check high card', () => {
      const HAND = new PokerHand();

      HAND.addCard(new Card('Spades', '2'));
      HAND.addCard(new Card('Spades', '4'));
      HAND.addCard(new Card('Spades', '6'));
      HAND.addCard(new Card('Spades', 'Jack'));
      HAND.addCard(new Card('Hearts', 'King'));

      expect(HAND.getCardScore(0)).toBe(11);
    });

    test('check hasFourOfAKind', () => {
      const HAND = new PokerHand();

      HAND.addCard(new Card('Spades', '5'));
      HAND.addCard(new Card('Diamonds', '5'));
      HAND.addCard(new Card('Hearts', '5'));
      HAND.addCard(new Card('Hearts', '2'));
      HAND.addCard(new Card('Clubs', '5'));
      HAND.addCard(new Card('Hearts', '3'));
      HAND.addCard(new Card('Hearts', '7'));


      expect(HAND.getCardScore(7)).toBe(3);
    });

    test('check hasThreeOfAKind', () => {
      const HAND = new PokerHand();

      HAND.addCard(new Card('Spades', '2'));
      HAND.addCard(new Card('Spades', 'Ace'));
      HAND.addCard(new Card('Spades', '3'));
      HAND.addCard(new Card('Diamonds', '2'));
      HAND.addCard(new Card('Hearts', '2'));

      expect(HAND.getCardScore(3)).toBe(0);
    });

    test('check hasTwoPair', () => {
      const HAND = new PokerHand();

      HAND.addCard(new Card('Spades', '2'));
      HAND.addCard(new Card('Spades', 'Ace'));
      HAND.addCard(new Card('Spades', '3'));
      HAND.addCard(new Card('Diamonds', '3'));
      HAND.addCard(new Card('Hearts', '2'));

      expect(HAND.getCardScore(2)).toBe(1);
    });

    test('check hasPair', () => {
      const HAND = new PokerHand();

      HAND.addCard(new Card('Spades', '2'));
      HAND.addCard(new Card('Spades', 'Ace'));
      HAND.addCard(new Card('Spades', '3'));
      HAND.addCard(new Card('Spades', '6'));
      HAND.addCard(new Card('Hearts', '2'));

      expect(HAND.getCardScore(1)).toBe(0);
    });
  });
});
