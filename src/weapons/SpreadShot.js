import Phaser from 'phaser'
import Weapon from './Weapon'

export default class extends Weapon  {

    constructor (game) {
        super({ game: game, name: "SpreadShot" });
        this.game = game;
    }

    fire(source) {
        if (this.game.time.time < this.nextFire) { return; }

        let y = source.y;
        let x = 20;

        this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 0);
        this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 100);
        this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, -100);

        this.nextFire = this.game.time.time + this.fireRate;
    }

}

