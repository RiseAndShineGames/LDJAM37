import Phaser from 'phaser'
import Enemy from './Enemy'
import { getRandomInt } from '../utils'

export default class extends Phaser.Group {

    constructor ({ game, weapon, player }) {
        super(game);
        Phaser.Group.call(this, game, game.world, "EnemyGroup", false, true, Phaser.Physics.ARCADE);
        this.game = game;
        this.nextFire = 0;
        this.fireRate = 1250;

        for (let i = 0; i < 64; i++) {
            this.add(new Enemy({ 
                game: game, 
                player: player,
                x: 0,
                y: 0
            }), true);
        }

    }

    fire() {
        if (this.game.time.time < this.nextFire) { return; }

        let x = this.game.width + 200;
        let y = getRandomInt(0, this.game.height - 100);

        this.getFirstExists(false).fire(x, y);

        this.nextFire = this.game.time.time + this.fireRate;

    }

}



