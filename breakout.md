# Creating a Breakout Clone in Create Phaser App

### Getting the file set up

Make a new file from the CPA template to create a Scene for your new game. Navigate to the `/scenes` folder and create a new file called `BreakoutClone.js`. Now add the following import statement, class declarations, and empty functions.

```
import Phaser from 'phaser/src/phaser.js';
export default class BreakoutClone extends Phaser.Scene {
    constructor() {}
    preload() {}
    create() {}
    update() {}
    render() {}
}
```

Navigate to the `Index.js` file. Change the `Index.js` file to load your newly created scene. You can either delete or comment out the CPA default example scene for now. The Scene tells CPA what scene to play first, such as a 'start screen'.

```
scene: [
    //StartScene,
    BreakoutClone
  ],
```

Open up your `BreakoutClone.js` file again. Rename the Phaser.Scene key from its default value (which is `default`) to a new key. The Scene's key is a unique key used to reference the scene. We'll rename it to 'BreakoutClone' for this example.

```
construction(){
    super({key: "BreakoutClone"})
}
```

### Add the game objects to the scene

We'll begin by loading assets in the preload function, which will gather up the assets needed in-game _before_ the game loop begins.

Instead of loading each image asset one by one (_*and* also adding it one by one later one_), we'll instead load one big sprite sheet that has all our combined assets.

```
preload() {
     this.load.atlas('assets', breakoutImgPack,breakoutImgAtlas);
}
```

But wait, what do those arguments mean? We're going to give this image atlas key a value of 'assets'. We then tell this.load.atlas where to look for the image. And finally we tell the function where to go for the json file that explains where and what each individual image frame is in the image file.

Now that our sprite sheet is being preloaded let's get that art onto the screen.

Adding the sprites in the create function.
We want to imbue these sprites with some arcade physics, so we won't be using the this.add.image. Instead we'll be using this.physics.add.

```
//Add the bricks
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
```

Add the paddle

```
this.paddle = this.physics.add
      .image(STAGE_MIDDLE_W, STAGE_HEIGHT - 32, 'assets', 'paddle2')
      .setImmovable();
```

Add the ball

```
    this.ball = this.physics.add
      .image(STAGE_MIDDLE_W, STAGE_HEIGHT - 64, 'assets', 'ball2')
      .setCollideWorldBounds(true)
      .setBounce(1);
    this.ball.setData('onPaddle', true);
```

### Add interactivity

Before we add velocity to the ball we first need to know if the ball is ready to start bouncing. And to know that we'll add data onto this.ball.

```
 this.ball.setData('onPaddle', true);
```

Make the try to make the paddle move left and right.

```
    this.input.on('pointermove', pointer => {
      this.paddle.x = this.pointer.x +1;
      );
    });
```

Ok, so that works, but we want the paddle to stay on the screen without flying off.

```
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
```

Make the ball move with the paddle.

```
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
```

Make the ball move with setVelocity and change the bool onPaddle. Now when the ball has launched from the paddle to begin bouncing away and smashing bricks, we'll have a false value for onValue.

```
  this.input.on('pointerup', pointer => {
      if (this.ball.getData('onPaddle')) {
        this.ball.setVelocity(50, -50);
        this.ball.setData('onPaddle', false);
      }
    });
```

Awesome! But oh no, the ball just keeps on going up and off the screen. We need to add in some collision functionality to keep the ball and paddle on screen.

### Add collision

create() {
this.physics.world.setBoundsCollision(true, true, true, false);
}

### Get the ball back onto the paddle

```
update() {
    if (this.ball.y > this.paddle.y) {
      this.restartBall();
    }
  }
```

```
  restartBall() {
    this.ball.setData('onPaddle', true);
    this.ball.x = this.paddle.x;
    this.ball.y = this.paddle.y - 32;
    this.ball.setVelocity(0, 0);
  }
```
