import Phaser from 'phaser'
import SingleShot from '../weapons/SingleShot';
import SpreadShot from '../weapons/SpreadShot';
import TwinCannons from '../weapons/TwinCannons';
import Beam from '../weapons/Beam';

export default class extends Phaser.Sprite {

    constructor ({ game, x, y, asset }) {
        super(game, x, y, asset)

        // Init variables
        this.game = game
        this.anchor.setTo(0, 0.5)
        this.scale.setTo(this.game.width / this.width * 0.15, this.game.height / this.height * 0.25);
        this.speed = 350
        this.deltaSpeed = 20
        this.currentWeapon = "default"

        // Physics and cursors
        this.game.physics.arcade.enable(this)
        this.body.collideWorldBounds = true;
        this.body.bounce.setTo(0.5);
        this.cursors = this.game.input.keyboard.addKeys({
            "up": Phaser.KeyCode.W,
            "up_alt": Phaser.KeyCode.UP,
            "down": Phaser.KeyCode.S,
            "down_alt": Phaser.KeyCode.DOWN,
            "shoot": Phaser.KeyCode.SPACEBAR,
            "change": Phaser.KeyCode.ENTER
        })

        // Change Weapons
        this.cursors.change.onDown.add(() => {
            switch (this.currentWeapon) {
                case "default":
                    this.currentWeapon = "twincannons";
                    break;
                case "twincannons":
                    this.currentWeapon = "spreadShot";
                    break;
                case "spreadShot":
                    this.currentWeapon = "beam";
                    break;
                case "beam":
                    this.currentWeapon = "default";
                    break;
            }
        })

        // Setup Weapons
        this.weapons = {
            default: new SingleShot(this.game),
            spreadShot: new SpreadShot(this.game),
            twincannons: new TwinCannons(this.game),
            beam: new Beam(this.game),
        }

    }

    update () {
        if (this.game.pseudoPause) {
            this.body.velocity.y = 0;
            return;
        }

        if ((this.cursors.up.isDown || this.cursors.up_alt.isDown) && this.body.velocity.y > this.speed * -1) {
            this.body.velocity.y -= this.deltaSpeed;
        } else if ((this.cursors.down.isDown || this.cursors.down_alt.isDown) && this.body.velocity.y < this.speed) {
            this.body.velocity.y += this.deltaSpeed;
        } else {
            if (this.body.velocity.y < 0) {
                this.body.velocity.y += this.deltaSpeed;
            } else if (this.body.velocity.y > 0) {
                this.body.velocity.y -= this.deltaSpeed;
            } else {
                this.body.velocity.y = 0;
            }
        }
        
        if (this.cursors.shoot.isDown) {
            this.weapons[this.currentWeapon].fire(this);
        }
    }

}
