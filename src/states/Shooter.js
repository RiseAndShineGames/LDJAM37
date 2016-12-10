import Phaser from 'phaser';
import Ship from '../sprites/Ship';
import Player from '../sprites/Player';

export default class extends Phaser.State {
    init () {}
    preload () {}
    create () {
        this.game.add.sprite(0,0, "space");
        this.ship = new Ship({
            game: this.game,
            x: 20,
            y: this.game.height * 0.5,
            asset: 'ship'
        });
        this.game.add.existing(this.ship);

        this.player = new Player({
            game: this.game,
            x: this.game.width * 0.5,
            y: this.game.height * 0.5,
            asset: 'player'
        });
        this.game.add.existing(this.player);

        this.game.input.keyboard.addKey(Phaser.KeyCode.K).onDown.add(() => {
            //this.game.physics.arcade.isPaused = !this.game.physics.arcade.isPaused;
            this.game.pseudoPause = !this.game.pseudoPause;
        });
    }
    update () {
    }

}
