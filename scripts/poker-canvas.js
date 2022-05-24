/* istanbul ignore file */
import {PokerController} from './PokerController.js';
import {PokerView} from './PokerViewCanvas.js';
import {PokerModel} from './PokerModel.js';

new PokerController(
    new PokerModel(),
    new PokerView('canvas', 'canvas-container', 'controls'),
);
