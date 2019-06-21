import '../assets/sky.png';

import Phaser from 'phaser/src/phaser.js';

import consts from '../config/constants';
import breakoutImgAtlas from '../sprites/breakout/breakout.json';
import breakoutImgPack from '../sprites/breakout/breakout.png';

const STAGE_WIDTH = consts.WIDTH;
const STAGE_HEIGHT = consts.HEIGHT;
const STAGE_MIDDLE_W = STAGE_WIDTH * 0.5;
const STAGE_MIDDLE_H = STAGE_HEIGHT * 0.5;

export default class BreakoutClone extends Phaser.Scene {
  constructor() {
    super({
      key: 'BreakoutClone'
    });
    console.log('this', this);
    this.bricks;
    this.paddle;
    this.ball;
  }

  preload() {
    this.load.atlas('assets', breakoutImgPack, breakoutImgAtlas);
  }

  create() {
    this.physics.world.setBoundsCollision(true, true, true, false);

    this.bricks = this.physics.add.staticGroup({
      key: 'assets',
      frame: ['yellow1', 'silver1', 'purple1'],
      frameQuantity: 6,
      gridAlign: {
        width: 6,
        height: 3,
        cellWidth: 64,
        cellHeight: 32,
        x: 100,
        y: 20
      }
    });

    this.ball = this.physics.add
      .image(STAGE_MIDDLE_W, STAGE_HEIGHT - 64, 'assets', 'ball2')
      .setCollideWorldBounds(true)
      .setBounce(1);
    this.ball.setData('onPaddle', true);

    this.paddle = this.physics.add
      .image(STAGE_MIDDLE_W, STAGE_HEIGHT - 32, 'assets', 'paddle2')
      .setImmovable();

    this.physics.add.collider(ball, paddle, this.hitPaddle, null, this);

    let paddleSize = this.paddle.width * 0.5;

    this.input.on('pointermove', pointer => {
      this.paddle.x = Phaser.Math.Clamp(
        pointer.x,
        paddleSize,
        STAGE_WIDTH - paddleSize
      );
      if (this.ball.getData('isOnPaddle')) {
        this.ball.x = this.paddle.x;
      }
    });

    this.input.on('pointerup', pointer => {
      if (this.ball.getData('isOnPaddle')) {
        this.ball.setVelocity(50, -50);
        this.ball.setData('isOnPaddle', false);
      }
    });
  }

  hitBrick() {}

  hitPaddle() {}

  restartBall() {
    this.ball.setData('onPaddle', true);
    this.ball.x = this.paddle.x;
    this.ball.y = this.paddle.y - 32;
    this.ball.setVelocity(0, 0);
  }

  restartGame() {}

  update() {
    if (this.ball.y > this.paddle.y) {
      this.restartBall();
    }
  }
  render() {}
}
