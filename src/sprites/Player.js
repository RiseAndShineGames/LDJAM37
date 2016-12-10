import Phaser from 'phaser'

export default class extends Phaser.Sprite {

  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset);

    this.game = game;
    this.anchor.setTo(0.5);
    this.game.physics.arcade.enable(this);
    this.movespeed = 100;

    this.animations.add('idle-up', [0],10,true);
    this.animations.add('walk-up', [1,2],5,true);
    this.animations.add('idle-left', [3],10,true);
    this.animations.add('walk-left', [4,5],5,true);
    this.animations.add('idle-down', [6],10,true);
    this.animations.add('walk-down', [7,8],5,true);
    this.animations.add('idle-right', [9],10,true);
    this.animations.add('walk-right', [10,11],5,true);
    this.animations.play('idle-right');

    this.cursors = this.game.input.keyboard.addKeys({
        "up": Phaser.KeyCode.W,
        "up_alt": Phaser.KeyCode.UP,
        "down": Phaser.KeyCode.S,
        "down_alt": Phaser.KeyCode.DOWN,
        "left": Phaser.KeyCode.A,
        "left_alt": Phaser.KeyCode.LEFT,
        "right": Phaser.KeyCode.D,
        "right_alt": Phaser.KeyCode.RIGHT,
        "action": Phaser.KeyCode.SPACEBAR,
        "action_alt": Phaser.KeyCode.ENTER
    })

  }

  update () {
    if (this.cursors.up.isDown || this.cursors.up_alt.isDown && !(this.cursors.down.isDown || this.cursors.down_alt.isDown)){
      this.body.velocity.y = -this.movespeed;
      this.body.velocity.x = 0;
      this.animations.play('walk-up');
    }
    else if (this.cursors.down.isDown || this.cursors.down_alt.isDown && !(this.cursors.up.isDown || this.cursors.up_alt.isDown)) {
      this.body.velocity.y = +this.movespeed;
      this.body.velocity.x = 0;
      this.animations.play('walk-down');
    }
    else if (this.cursors.right.isDown || this.cursors.right_alt.isDown && !(this.cursors.left.isDown || this.cursors.left_alt.isDown)) {
      this.body.velocity.x = this.movespeed;
      this.body.velocity.y = 0;
      this.animations.play('walk-right');
    }
    else if (this.cursors.left.isDown || this.cursors.left_alt.isDown && !(this.cursors.right.isDown || this.cursors.right_alt.isDown)) {
      this.body.velocity.x = -this.movespeed;
      this.body.velocity.y = 0;
      this.animations.play('walk-left');
    }
    else if (//left and right are not pressed
        !(this.cursors.left.isDown || this.cursors.left_alt.isDown || this.cursors.right.isDown || this.cursors.right_alt.isDown)
        &&// upand down are not pressed
        !(this.cursors.up.isDown || this.cursors.up_alt.isDown || this.cursors.down.isDown || this.cursors.down_alt.isDown)
      ){
      if(this.body.velocity.y > 0){
        this.body.velocity.y = 0;
        this.animations.play("idle-down");
      }

      if(this.body.velocity.y < 0){
        this.body.velocity.y = 0;
        this.animations.play("idle-up");
      }

      if(this.body.velocity.x > 0){
        this.body.velocity.x = 0;
        this.animations.play("idle-right");
      }

      if(this.body.velocity.x < 0){
        this.body.velocity.x = 0;
        this.animations.play("idle-left");
      }
    }
  }

}
