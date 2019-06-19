import '../assets/sky.png';

import Phaser from 'phaser/src/phaser.js';

import breakoutImgAtlas from '../sprites/breakout/breakout.json';
import breakoutImgPack from '../sprites/breakout/breakout.png';

class SomeSprite extends Phaser.Sprite {
  constructor({ scene, x, y }) {
    super(scene, x, y, 'sprite');
  }
  preload() {}
  create() {}
}

export default class BreakoutClone extends Phaser.Scene {
  constructor() {
    super({ key: 'BreakoutClone' });
    this.bricks;
    this.paddle;
    this.ball;

    this.s = new SomeSprite({
      scene: this,
      x: 20,
      y: 20
    });
  }

  preload() {
    console.log(breakoutImgAtlas);
    this.load.atlas('assets', breakoutImgPack, breakoutImgAtlas);
    this.foo = 'danknugz';
  }

  create() {
    this.physics.world.setBoundsCollision(true, true, true, false);

    this.bricks = this.physics.add.staticGroup({
      key: 'assets',
      frame: ['blue1', 'red1', 'green1', 'yellow1', 'silver1', 'purple1'],
      frameQuantity: 8,
      gridAlign: {
        width: 8,
        height: 6,
        cellWidth: 64,
        cellHeight: 32,
        x: 112,
        y: 100
      }
    });
  }
  update() {}
  render() {}
}
