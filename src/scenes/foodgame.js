import Phaser from 'phaser/src/phaser.js';

import BackgroundSea from '../assets/backgrounds/start/sea.png';
import playerStill from '../assets/player-image.png';
import { HEIGHT, SCALE, WIDTH } from '../config/constants';

export default class FoodGame extends Phaser.Scene {
  constructor() {
    super({ key: 'FoodGame' });
  }
  preload() {
    this.load.image('BackgroundSea', BackgroundSea);
    this.load.image('player-still', playerStill);
  }
  create() {
    this.c = this.add.image(100, 100, 'player-still', 0);
    let bg = this.add.sprite(0, 0, 'BackgroundSea');
    bg.setOrigin(0, 0);
  }
  update() {
    this.c.y = this.c.y + 1;
    console.log(this.c.y);
  }
  render() {}
}
