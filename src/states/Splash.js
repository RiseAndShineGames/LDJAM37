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
        this.load.image('enemyBullet', 'assets/images/enemybullet.png')
        this.load.spritesheet('player', 'assets/images/player.png',32,32,12)
        this.load.image('ship', 'assets/images/ship.png')
        this.load.image('enemy', 'assets/images/enemyship.png')
        this.load.image('space', 'assets/images/space.png')
        this.load.image('room', 'assets/images/room.png')

		let transitionIntoShipSound = "assets/audio/sfx/SFX-TransitionIntoShip-Shortened.mp3";
		let transitionOutOfShipSound = "assets/audio/sfx/SFX-TransitionOutOfShip-Shortened.mp3";
		let shipFlyingSong = "assets/audio/music/ShipFlyingSong-Looped.mp3";
		let insideShipSong = "assets/audio/music/InsideShipLoop-Draft.mp3";
		let singleShotSound = "assets/audio/sfx/SFX-RightGunSound.mp3";
		let twinCannonsSound = "assets/audio/sfx/SFX-GunsTogetherSound.mp3";
		let beamShotSound = "assets/audio/sfx/SFX-BeamWeapon-Draft.mp3";
		let spreadShotSound = "assets/audio/sfx/SFX-TripleShotWeapon-Draft.mp3";
		
		this.game.load.audio('InsideShipMusic', insideShipSong);
		this.game.load.audio('ShipFlyingMusic', shipFlyingSong);
		this.game.load.audio('TransitionIntoShip', transitionIntoShipSound);
		this.game.load.audio('TransitionOutOfShip', transitionOutOfShipSound);
		this.game.load.audio('SingleShotSound', singleShotSound);
		this.game.load.audio('TwinCannonsSound', twinCannonsSound);
		this.game.load.audio('BeamShotSound', beamShotSound);
		this.game.load.audio('SpreadShotSound', spreadShotSound);

    }

    create () {
        this.state.start('Shooter')
    }

}
