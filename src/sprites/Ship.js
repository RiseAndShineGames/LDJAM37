import Phaser from 'phaser'
import SingleShot from '../weapons/SingleShot';
import SpreadShot from '../weapons/SpreadShot';
import Shotgun from '../weapons/Shotgun';
import Beam from '../weapons/Beam';

export default class extends Phaser.Sprite {

    constructor ({ game, x, y, asset }) {
        super(game, x, y, asset)

        // Init variables
        this.game = game
        this.anchor.setTo(0, 0.5)
        this.speed = 350
        this.currentWeapon = "default"

        // Physics and cursors
        this.game.physics.arcade.enable(this)
        this.cursors = this.game.input.keyboard.addKeys({
            "up": Phaser.KeyCode.W,
            "up_alt": Phaser.KeyCode.UP,
            "down": Phaser.KeyCode.S,
            "down_alt": Phaser.KeyCode.DOWN,
            "shoot": Phaser.KeyCode.SPACEBAR,
            "change": Phaser.KeyCode.ENTER
        })
        this.cursors.change.onDown.add(() => {
            switch (this.currentWeapon) {
                case "default":
                    this.currentWeapon = "spreadShot";
                    break;
                case "spreadShot":
                    this.currentWeapon = "shotgun";
                    break;
                case "shotgun":
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
            shotgun: new Shotgun(this.game),
            beam: new Beam(this.game),
        }

    }

    update () {
        this.body.velocity.y = 0;
        if (this.cursors.up.isDown || this.cursors.up_alt.isDown) {
            this.body.velocity.y = this.speed * -1.0
        } else if (this.cursors.down.isDown || this.cursors.down_alt.isDown) {
            this.body.velocity.y = this.speed
        }
        
        if (this.cursors.shoot.isDown) {
            this.weapons[this.currentWeapon].fire(this);
        }
    }

}
