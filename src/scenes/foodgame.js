import Phaser from 'phaser/src/phaser.js';

import seaTitle from '../assets/backgrounds/start/sea.png';
import playerStill from '../assets/player-image.png';
import { HEIGHT, SCALE, WIDTH } from '../config/constants';

export default class FoodGame extends Phaser.Scene {
  constructor() {
    super({ key: 'FoodGame' });
  }
  preload() {
    // this.load.image('sea-title', seaTitle);
    this.load.image('player-still', playerStill);
  }
  create() {
    this.add.image(100, 100, 'player-still', 0);
  }
  update() {}
  render() {}
}
