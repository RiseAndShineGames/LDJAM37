import Phaser from 'phaser'
import Weapon from './Weapon'
import { getRandomInt } from '../utils'

export default class extends Weapon  {

    constructor (game, isEnemy) {
        super({ game: game, name: "SingleShot" });
        this.game = game;
        this.isEnemy = isEnemy;
        this.lastShot = 20;
    }

    fire(source) {
        if (this.game.time.time < this.nextFire) { return; }

        let y = source.position.y + this.lastShot;
        this.lastShot = -this.lastShot;
        let x = (this.isEnemy) ? source.position.x - 20: source.position.x + source.width + 10;
        let angle = (this.isEnemy) ? -180 : 0;

        this.getFirstExists(false).fire(x, y, angle, this.bulletSpeed, 0, 0);

        this.nextFire = this.game.time.time + this.fireRate;
		
		if (!this.isEnemy) {
            this.game.sound.play('SingleShotSound', 1, false);
        }
    }

}
