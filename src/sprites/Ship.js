import Phaser from 'phaser'
import SingleShot from '../weapons/SingleShot';
import SpreadShot from '../weapons/SpreadShot';
import Shotgun from '../weapons/Shotgun';

export default class extends Phaser.Sprite {

    constructor ({ game, x, y, asset }) {
        super(game, x, y, asset)

        this.game = game
        this.anchor.setTo(0, 0.5)
        this.cursors = this.game.input.keyboard.addKeys({
            "up": Phaser.KeyCode.W,
            "up_alt": Phaser.KeyCode.UP,
            "down": Phaser.KeyCode.S,
            "down_alt": Phaser.KeyCode.DOWN
        });
    }

    update () {
    }

}
