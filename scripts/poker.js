/* istanbul ignore file */
import {PokerController} from './PokerController.js';
import {PokerView} from './PokerView.js';
import {PokerModel} from './PokerModel.js';

new PokerController(
    new PokerModel(),
    new PokerView('playing-field', 'controls'),
);


