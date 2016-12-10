import Phaser from 'phaser'
import Weapon from './Weapon'
import { getRandomInt } from '../utils'

export default class extends Weapon  {

    constructor (game) {
        super({ game: game, name: "SingleShot" });
        this.game = game;
        this.scatterDistance = 10;
    }

    fire(source) {
        if (this.game.time.time < this.nextFire) { return; }

        let y = source.position.y + getRandomInt(-1 * this.scatterDistance, this.scatterDistance);
        let x = source.position.x + source.width + 10;

        this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 0);

        this.nextFire = this.game.time.time + this.fireRate;
    }

}
