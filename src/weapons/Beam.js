import Phaser from 'phaser'
import Weapon from './Weapon'
import { getRandomInt } from '../utils'

export default class extends Weapon  {

    constructor (game, isEnemy) {
        super({ game: game, name: "Beam" });
        this.game = game;
        this.isEnemy = isEnemy;
        this.fireRate = 25;
    }

    fire(source) {
        if (this.game.time.time < this.nextFire) { return; }

        let y = source.position.y;
        let x = (this.isEnemy) ? source.position.x + source.width - 25: source.position.x + source.width + 25;
        let angle = (this.isEnemy) ? -180 : 0;

        this.getFirstExists(false).fire(x, y, angle, this.bulletSpeed, 0, 0);

        this.nextFire = this.game.time.time + this.fireRate;
		
        if (!this.isEnemy) {
            this.game.sound.play('BeamShotSound', 1, false);
        }
    }

}

