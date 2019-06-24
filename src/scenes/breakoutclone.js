import Phaser from 'phaser/src/phaser.js';

import breakoutImgAtlas from '../assets/breakout.json';
import breakoutImgPack from '../assets/breakout.png';
import consts from '../config/constants';

const STAGE_WIDTH = consts.WIDTH;
const STAGE_HEIGHT = consts.HEIGHT;
const STAGE_MIDDLE_W = STAGE_WIDTH * 0.5;
const STAGE_MIDDLE_H = STAGE_HEIGHT * 0.5;
const START_RANGE = 100;

const paddleY = STAGE_HEIGHT - 40;
const ballY = paddleY - 8;

export default class BreakoutClone extends Phaser.Scene {
  constructor() {
    super({
      key: 'BreakoutClone'
    });
    console.log('this', this);
    this.bricks;
    this.paddle;
    this.ball;
    this.gameIsWon;
    this.winMsg;
  }

  preload() {
    this.load.atlas('assets', breakoutImgPack, breakoutImgAtlas);
    console.log('atlas', breakoutImgAtlas);
  }

  create() {
    this.physics.world.setBoundsCollision(true, true, true, false);

    this.bricks = this.physics.add.staticGroup({
      key: 'assets',
      frame: ['brick-blue.png', 'brick-rainbow.png', 'brick-black.png', 'brick-yellow.png', 'brick-white.png', 'brick-red.png'],
      frameQuantity: 16,
      gridAlign: {
        width: 16,
        height: 6,
        cellWidth: 16,
        cellHeight: 8,
        x: 100,
        y: 50
      }
    });



    this.ball = this.physics.add
      .image(STAGE_MIDDLE_W, ballY, 'assets', 'ball-1.png')
      .setCollideWorldBounds(true)
      .setBounce(1);


    this.particles = this.add.particles('assets', 'ball-1.png');



    this.ballEmitter = this.particles.createEmitter({
      alpha: {
        start: 0.5,
        end: 0
      },
      scale: {
        start: 1,
        end: 1
      },
      //tint: { start: 0xff945e, end: 0xff945e },
      speed: 0,
      accelerationY: 0,
      angle: {
        min: 0,
        max: 0
      },
      rotate: {
        min: 0,
        max: 0
      },
      lifespan: {
        min: 400,
        max: 400
      },

      frequency: 5,
      maxParticles: 125,
      x: 0,
      y: 0,
      on: false
    });

    this.ballEmitter.startFollow(this.ball);

    this.ball.setData('onPaddle', true);

    this.paddle = this.physics.add
      .image(STAGE_MIDDLE_W, paddleY, 'assets', 'paddle-1.png')
      .setImmovable();

    this.physics.add.collider(
      this.ball,
      this.paddle,
      this.hitPaddle,
      null,
      this
    );
    this.physics.add.collider(
      this.ball,
      this.bricks,
      this.hitBrick,
      null,
      this
    );

    let paddleSize = this.paddle.width * 0.5;

    this.input.on('pointermove', pointer => {
      this.paddle.x = Phaser.Math.Clamp(
        pointer.x,
        paddleSize,
        STAGE_WIDTH - paddleSize
      );

      if (this.ball.getData('onPaddle')) {
        this.ball.x = this.paddle.x;
      }
    });

    this.input.on('pointerup', pointer => {
      if (this.ball.getData('onPaddle')) {
        this.ball.setData('onPaddle', false);
        this.ballEmitter.on = true;
        this.ball.setVelocity(Phaser.Math.Between(-START_RANGE, START_RANGE), -200);
      }
    });

    this.input.on('pointerdown', pointer => {
      if (this.gameWon === true) {
        this.gameWon = false;
        this.winMsg.destroy();
        this.restartBricks();
      }
    });
  }

  hitBrick(ball, brick) {

    brick.disableBody(true, true);

    console.log(brick)
    let shakeAmt = Math.abs(Math.floor(this.ball.body.velocity.x))
    this.cameras.main.shake(shakeAmt);

    if (this.bricks.countActive() === 0) {
      this.winGame();
    }
  }

  winGame() {
    this.gameWon = true;

    this.winMsg = this.add.text(
      STAGE_MIDDLE_W - 64,
      STAGE_MIDDLE_H / 2,
      'You won!', {
        fontSize: '24px',
        fill: 'pink'
      }
    );

    this.restartBall();
    this.ball.setTint(0xff0000, 0x00ff00, 0x0000ff, 0xff0000);
  }

  hitPaddle() {
    let ballOnLeft = this.ball.x < this.paddle.x;
    let ballOnRight = this.ball.x > this.paddle.x;
    let ballOnMiddle = this.ball.x === this.paddle.x;
    let velocity;
    let magnitude = 10;
    let lDirection = this.paddle.x - this.ball.x;
    let rDirection = this.ball.x - this.paddle.x;

    if (ballOnRight) {
      velocity = -magnitude * lDirection;
    }
    if (ballOnLeft) {
      velocity = magnitude * rDirection;
    }
    if (ballOnMiddle) {
      velocity = magnitude * Math.random();
    }

    this.ball.setVelocityX(velocity);
  }

  restartBall() {
    this.ball.setData('onPaddle', true);
    this.ballEmitter.on = false;
    this.ball.x = this.paddle.x;
    this.ball.y = ballY;
    this.ball.setVelocity(0, 0);
  }

  restartGame() {
    this.gameWon = false;
    this.winMsg.destroy();
    this.restartBall();
    this.restartBricks();
  }

  restartBricks() {
    this.bricks.children.each(brick => {
      brick.enableBody(false, 0, 0, true, true);
    });
  }

  update() {
    if (this.ball.y > STAGE_HEIGHT) {
      this.restartBall();
    }
  }
  render() {}
}
