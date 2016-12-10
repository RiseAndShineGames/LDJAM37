import Phaser from 'phaser'
import Weapon from './Weapon'
import { getRandomInt } from '../utils'

export default class extends Weapon  {

    constructor (game) {
        super({ game: game, name: "SingleShot" });
        this.game = game;
        this.scatterDistance = 25;
    }

    fire(source) {
        if (this.game.time.time < this.nextFire) { return; }

        let y = source.y + getRandomInt(-1 * this.scatterDistance, this.scatterDistance);
        let x = 20;

        this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 0);

        this.nextFire = this.game.time.time + this.fireRate;
    }

}
