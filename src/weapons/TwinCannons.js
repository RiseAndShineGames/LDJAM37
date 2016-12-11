import Phaser from 'phaser'
import Weapon from './Weapon'

export default class extends Weapon  {

    constructor (game, isEnemy) {
        super({ game: game, name: "TwinCannons" });
        this.game = game;
        this.isEnemy = isEnemy;
        this.distance = 25;
    }

    fire(source) {
        if (this.game.time.time < this.nextFire) { return; }

        let y = source.position.y;
        let x = (this.isEnemy) ? source.position.x + source.width - 10: source.position.x + source.width + 10;
        let angle = (this.isEnemy) ? -180 : 0;

        this.getFirstExists(false).fire(x, y - this.distance, angle, this.bulletSpeed, 0, 0);
        this.getFirstExists(false).fire(x, y + this.distance, angle, this.bulletSpeed, 0, 0);

        this.nextFire = this.game.time.time + this.fireRate;
		
		if (!this.isEnemy) {
            this.game.sound.play('TwinCannonsSound', 1, false);
        }
    }

}


