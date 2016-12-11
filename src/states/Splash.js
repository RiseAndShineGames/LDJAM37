import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
    init () {}

    preload () {
        this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
        this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
        centerGameObjects([this.loaderBg, this.loaderBar])

        this.game.load.setPreloadSprite(this.loaderBar)
        //
        // load your assets
        //
        this.load.image('bullet', 'assets/images/bullet.png')
        this.load.spritesheet('player', 'assets/images/player.png',32,32,12)
        this.load.image('ship', 'assets/images/ship.png')
        this.load.image('enemy', 'assets/images/enemyship.png')
        this.load.image('space', 'assets/images/space.png')
        this.load.image('room', 'assets/images/room.png')
    }

    create () {
        this.state.start('Shooter')
    }

}
