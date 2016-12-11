import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
    init () {
		this.game.sound.mute = false
	}

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

		var transitionIntoShipSound = "assets/audio/music/TransitionIntoShipDraft.mp3";
		var transitionOutOfShipSound = "assets/audio/music/TransitionOutOfShipDraft.mp3";
		var shipFlyingSong = "assets/audio/music/ShipFlyingSong-Looped.mp3";
		var insideShipSong = "assets/audio/music/InsideShipLoop-Draft.mp3";
		var singleShotSound = "assets/audio/sfx/SFX-RightGunSound.mp3";
		var twinCannonsSound = "assets/audio/sfx/SFX-GunsTogetherSound.mp3";
		
		this.game.load.audio('InsideShipMusic', insideShipSong);
		this.game.load.audio('ShipFlyingMusic', shipFlyingSong);
		this.game.load.audio('TransitionIntoShip', transitionIntoShipSound);
		this.game.load.audio('TransitionOutOfShip', transitionOutOfShipSound);
		this.game.load.audio('SingleShotSound', singleShotSound);
		this.game.load.audio('TwinCannonsSound', twinCannonsSound);
    }

    create () {
        this.state.start('Shooter')
    }

}
