import Phaser from 'phaser'

export default class extends Phaser.Sprite {

  constructor ({ game, x, y, asset, velocity }) {
    super(game, x, y, asset);
    this.game = game;
    this.anchor.setTo(0.5);
    this.scale.set(1);
    this.game.physics.arcade.enable(this);
    let v = velocity || {"x":0,"y":0};
    this.body.velocity.x = v.x;
    this.body.velocity.y = v.y;

  }

  update () {
    if (this.game.pseudoPause){
      console.log("pseudo",this.body.velocity);
      if(!this.prevVel){
        this.game.timerSpawnPowerup.pause();
        this.prevVel= {
          "x": this.body.velocity.x,
          "y": this.body.velocity.y
        };
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
      }
    }else{
      if(this.prevVel){
        this.game.timerSpawnPowerup.resume();
        this.body.velocity.x = this.prevVel.x;
        this.body.velocity.y = this.prevVel.y;
        this.prevVel = null;
      }
    }
    // if (this.cursors.up.isDown || this.cursors.up_alt.isDown && !(this.cursors.down.isDown || this.cursors.down_alt.isDown)){
    //   this.body.velocity.y = -this.movespeed;
    //   this.body.velocity.x = 0;
    //   this.animations.play('walk-up');
    //
    // }
    // else if (this.cursors.down.isDown || this.cursors.down_alt.isDown && !(this.cursors.up.isDown || this.cursors.up_alt.isDown)) {
    //   this.body.velocity.y = +this.movespeed;
    //   this.body.velocity.x = 0;
    //   this.animations.play('walk-down');
    // }
    // else if (this.cursors.right.isDown || this.cursors.right_alt.isDown && !(this.cursors.left.isDown || this.cursors.left_alt.isDown)) {
    //   this.body.velocity.x = this.movespeed;
    //   this.body.velocity.y = 0;
    //   this.animations.play('walk-right');
    // }
    // else if (this.cursors.left.isDown || this.cursors.left_alt.isDown && !(this.cursors.right.isDown || this.cursors.right_alt.isDown)) {
    //   this.body.velocity.x = -this.movespeed;
    //   this.body.velocity.y = 0;
    //   this.animations.play('walk-left');
    // }
    // else if (//left and right are not pressed
    //     !(this.cursors.left.isDown || this.cursors.left_alt.isDown || this.cursors.right.isDown || this.cursors.right_alt.isDown)
    //     &&// upand down are not pressed
    //     !(this.cursors.up.isDown || this.cursors.up_alt.isDown || this.cursors.down.isDown || this.cursors.down_alt.isDown)
    //   ){
    //   if(this.body.velocity.y > 0){
    //     this.body.velocity.y = 0;
    //     this.animations.play("idle-down");
    //   }
    //
    //   if(this.body.velocity.y < 0){
    //     this.body.velocity.y = 0;
    //     this.animations.play("idle-up");
    //   }
    //
    //   if(this.body.velocity.x > 0){
    //     this.body.velocity.x = 0;
    //     this.animations.play("idle-right");
    //   }
    //
    //   if(this.body.velocity.x < 0){
    //     this.body.velocity.x = 0;
    //     this.animations.play("idle-left");
    //   }
    // }
  }

}
