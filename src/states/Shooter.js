import Phaser from 'phaser';
import Ship from '../sprites/Ship';

export default class extends Phaser.State {
    init () {}
    preload () {}
    create () {
        this.ship = new Ship({
            game: this.game,
            x: 20,
            y: this.game.height * 0.5,
            asset: 'ship'
        });
        this.game.add.existing(this.ship);
    }
    update () {
    }

}
