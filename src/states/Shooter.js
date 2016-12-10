import Phaser from 'phaser';
import Ship from '../sprites/Ship';

export default class extends Phaser.State {
    init () {}
    preload () {}
    create () {
        this.bg = this.game.add.sprite(0,0, "space");
        this.bg.scale.setTo(this.game.width/this.bg.width,this.game.height/this.bg.height);
        this.ship = new Ship({
            game: this.game,
            x: 20,
            y: this.game.height * 0.5,
            asset: 'ship'
        });
        this.game.add.existing(this.ship);
        this.game.input.keyboard.addKey(Phaser.KeyCode.K).onDown.add(() => {
            this.state.start('Interior')
        });
    }
    update () {
    }

}
