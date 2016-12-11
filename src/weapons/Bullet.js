import Phaser from 'phaser'

export default class extends Phaser.Sprite {

    constructor ({ game, asset }) {
        super(game, 0, 0, asset)
        this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
        this.game = game
        this.anchor.setTo(0.5)
        this.checkWorldBounds = true;
        this.outOfBoundsKill = true;
        this.exists = false;
        this.tracking = false;
        this.scaleSpeed = 0;
    }

    fire(x, y, angle, speed, _gx, _gy) {
        let gx = _gx || 0;
        let gy = _gy || 0;
        this.reset(x, y);
        this.scale.set(0.5);
        this.game.physics.arcade.velocityFromAngle(angle, speed, this.body.velocity);
        this.angle = angle;
        this.body.gravity.set(gx, gy);
    }

    update () {
        if (this.game.pseudoPause) {
          if(!this.prevVel){
            // this.prevVel= {};
            // this.prevVel.x = this.body.velocity.x;
            // this.prevVel.y = this.body.velocity.y;
            // this.prevG = {"x":this.body.gravity.x,"y":this.body.gravity.y};
            // this.body.velocity.x = 0;
            // this.body.velocity.y = 0;
            // this.body.gravity.set(0,0);
          }
            return;
        }else{
          if(this.prevVel){
            if(this.prevVel.x === 800){
          console.log(this.prevVel);
            }
            this.body.velocity.x = this.prevVel.x;
            this.body.velocity.y = this.prevVel.y;
            this.body.gravity.set(this.prevG.x,this.prevG.y);
            this.prevG = null;
            this.prevVel = null;
          }
        }

    }


}
