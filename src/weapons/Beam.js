import Phaser from 'phaser'
import Weapon from './Weapon'
import { getRandomInt } from '../utils'

export default class extends Weapon  {

    constructor (game) {
        super({ game: game, name: "Beam" });
        this.game = game;
        this.fireRate = 25;
    }

    fire(source) {
        if (this.game.time.time < this.nextFire) { return; }

        let y = source.y;
        let x = 20;

        this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 0);

        this.nextFire = this.game.time.time + this.fireRate;
    }

}

