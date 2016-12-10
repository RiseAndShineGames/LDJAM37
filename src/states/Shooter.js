import Phaser from 'phaser';
import SingleShot from '../weapons/SingleShot';
import SpreadShot from '../weapons/SpreadShot';
import Shotgun from '../weapons/Shotgun';

export default class extends Phaser.State {
    init () {}
    preload () {}
    create () {
        this.weapon = new Shotgun(this.game);
        this.shoot = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    }
    update () {
        if (this.shoot.isDown) {
            this.weapon.fire(this.game.input.activePointer.position);
        }
    }

}
