import Phaser from 'phaser'
import SingleShot from '../weapons/SingleShot';
import SpreadShot from '../weapons/SpreadShot';
import TwinCannons from '../weapons/TwinCannons';
import Beam from '../weapons/Beam';

export default class extends Phaser.Sprite {

    constructor ({ game, player, x, y, weapon }) {
        super(game, x, y, 'enemy')
        this.player = player;
        switch (weapon) {
            case "SpreadShot":
                this.weapon = new SpreadShot(this.game, true);
                break;
            case "TwinCannons":
                this.weapon = new TwinCannons(this.game, true);
                break;
            case "Beam":
                this.weapon = new Beam(this.game, true);
                break;
            default: 
                this.weapon = new SingleShot(this.game, true);
                break;
        }
        this.weapon.fireRate *= 1.75

        // Init variables
        this.game = game
        this.anchor.setTo(1, 0.5)
        this.scale.setTo(-this.game.width / this.width * 0.05, this.game.height / this.height * 0.10);
        this.speed = 150
        this.deltaSpeed = 5
        this.health = 1;
        this.exists = false;

        // Physics and cursors
        this.game.physics.arcade.enable(this)
        this.body.velocity.x = -125;

    }

    update () {
        if (this.game.pseudoPause) {
            this.body.velocity.y = 0;
            this.body.velocity.x = 0;
            return;
        }

        this.body.velocity.x = -125;
        if (!this.exists) {
            return
        }

        if (this.x <= 100 || this.health <= 0) {
            this.destroy();
            return
        }

        this.game.physics.arcade.overlap(this.player, this.weapon, this.shotPlayer, null, this);

        this.weapon.fire(this);

        if (this.player.y > this.y && this.body.velocity.y < this.speed) {
            this.body.velocity.y += this.deltaSpeed;
        } else if (this.player.y < this.y && this.body.velocity.y > this.speed * -1) {
            this.body.velocity.y -= this.deltaSpeed;
        } else {
            if (this.body.velocity.y < 0) {
                this.body.velocity.y += this.deltaSpeed;
            } else if (this.body.velocity.y > 0) {
                this.body.velocity.y -= this.deltaSpeed;
            } else {
                this.body.velocity.y = 0;
            }
        }

    }

    shotPlayer (ship, bullet) {
        bullet.destroy();
    }
    
    fire(x, y) {
        this.exists = true;
        this.x = x;
        this.y = y;
    }

}

