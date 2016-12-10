import Phaser from 'phaser';
import Player from '../sprites/Player';

export default class extends Phaser.State {
    init () {}
    preload () {}
    create () {
        this.game.add.sprite(0,0, "room");
        this.player = new Player({
            game: this.game,
            x: this.game.width * 0.5,
            y: this.game.height * 0.5,
            asset: 'player'
        });
        this.game.add.existing(this.player);


    }
    update () {


    }
}
