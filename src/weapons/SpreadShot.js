import Phaser from 'phaser'
import Weapon from './Weapon'

export default class extends Weapon  {

    constructor (game) {
        super({ game: game, name: "SpreadShot" });
        this.game = game;
        this.fireRate = 1000;
    }

    fire(source) {
        if (this.game.time.time < this.nextFire) { return; }

        let y = source.position.y;
        let x = source.position.x + source.width + 10;

        this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 0);
        this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 100);
        this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, -100);

        this.nextFire = this.game.time.time + this.fireRate;
    }

}

