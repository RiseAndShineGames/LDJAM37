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
        this.scale.set(1);
        this.game.physics.arcade.velocityFromAngle(angle, speed, this.body.velocity);
        this.angle = angle;
        this.body.gravity.set(gx, gy);
    }

}
