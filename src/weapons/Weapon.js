import Phaser from 'phaser'
import Bullet from './Bullet'

export default class extends Phaser.Group {

    constructor ({ game, name }) {
        super(game);
        Phaser.Group.call(this, game, game.world, name, false, true, Phaser.Physics.ARCADE);
        this.nextFire = 0;
        this.bulletSpeed = 800;
        this.fireRate = 250;

        for (let i = 0; i < 64; i++) {
            this.add(new Bullet({ game: game, asset: 'bullet'}), true);
        }

    }

    fire(source) {}

}



