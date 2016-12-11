import Phaser from 'phaser'
import Bullet from './Bullet'

export default class extends Phaser.Group {

    constructor ({ game, name, isEnemy }) {
        super(game);
        Phaser.Group.call(this, game, game.world, name, false, true, Phaser.Physics.ARCADE);
        this.game = game;
        this.nextFire = 0;
        this.bulletSpeed = 800;
        this.fireRate = 250;
        let asset = (isEnemy) ? 'enemyBullet' : 'bullet';

        for (let i = 0; i < 128; i++) {
            this.add(new Bullet({ game: game, asset: asset}), true);
        }

    }

    fire(source) {}

}



