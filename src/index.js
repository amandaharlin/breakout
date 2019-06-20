import './index.css';
import './font-loader';

import Phaser from 'phaser';

import LightraysPlugin from '../src/plugins/lightrays/index.js';
import constants from './config/constants';
import CustomPipeline from './rendering-pipelines/CustomPipeline';
import BreakoutClone from './scenes/breakoutclone';
import FoodGame from './scenes/foodgame';
import GameScene from './scenes/game';
import StartScene from './scenes/start';

window.Phaser = Phaser;

const config = {
  type: Phaser.AUTO,
  width: constants.WIDTH,
  height: constants.HEIGHT,
  // plugins: {
  //   scene: [
  //     {
  //       key: 'LightraysPlugin',
  //       plugin: LightraysPlugin,
  //       mapping: 'lightrays'
  //     }
  //   ]
  // },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: true
    }
  },
  scene: [
    //StartScene,
    //GameScene
    //FoodGame
    BreakoutClone
  ],
  pixelArt: true,
  antialias: false
  // callbacks: {
  //   postBoot: game => {
  //     game.renderer.addPipeline('Custom', new CustomPipeline(game));
  //   }
  // }
};

const game = new Phaser.Game(config);

window.game = game;
