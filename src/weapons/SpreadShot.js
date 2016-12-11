import Phaser from 'phaser'
import Weapon from './Weapon'

export default class extends Weapon  {

    constructor (game, isEnemy) {
        super({ game: game, name: "SpreadShot" });
        this.game = game;
        this.isEnemy = isEnemy;
        this.fireRate = 1000;
        this.gravity = 300;
    }

    fire(source) {
        if (this.game.time.time < this.nextFire) { return; }

        let y = source.position.y;
        let x = (this.isEnemy) ? source.position.x + source.width - 10: source.position.x + source.width + 10;
        let angle = (this.isEnemy) ? -180 : 0;

        this.getFirstExists(false).fire(x, y, angle, this.bulletSpeed, 0, 0);
        this.getFirstExists(false).fire(x, y, angle - 30, this.bulletSpeed * 1.1, 0, 400);
        this.getFirstExists(false).fire(x, y, angle + 30, this.bulletSpeed * 1.1, 0, -400);

        this.nextFire = this.game.time.time + this.fireRate;
		
		this.game.sound.play('SpreadShotSound', 1, false);
    }

}

