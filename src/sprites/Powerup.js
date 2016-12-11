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
        this.prevVel= {
          "x": this.body.velocity.x,
          "y": this.body.velocity.y
        };
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
      }
    }else{
      if(this.prevVel){
        this.body.velocity.x = this.prevVel.x;
        this.body.velocity.y = this.prevVel.y;
        this.prevVel = null;
      }
    }
  }

}
