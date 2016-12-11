import Phaser from 'phaser';
import Ship from '../sprites/Ship';
import Player from '../sprites/Player';
import Powerup from '../sprites/Powerup';
import EnemyGroup from '../sprites/EnemyGroup';

export default class extends Phaser.State {
    init () {}
    preload () {}
    create () {

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.shooterGroup = this.game.add.group();
        this.spaceBG = this.game.add.sprite(0,0, "space");
        this.spaceBG.scale.setTo(this.game.width/this.spaceBG.width,this.game.height/this.spaceBG.height);
        this.ship = new Ship({
            game: this.game,
            x: 20,
            y: this.game.height * 0.5,
            asset: 'ship'
        });
        this.game.add.existing(this.ship);
        // this.game.timerSpawnPowerup.loop(Phaser.Timer.SECOND *3,this.addPickup, this);
        // console.log(this.game);
        // this.game.timerSpawnPowerup.start();
        this.game.shooterGroup.add(this.spaceBG);
        this.game.shooterGroup.add(this.ship);

        this.enemyGroup = new EnemyGroup({
            game: this.game,
            player: this.ship
        });
        this.game.shooterGroup.add(this.enemyGroup);
        this.ship.addEnemies(this.enemyGroup);

        this.interiorGroup = this.game.add.group();
        this.roomBG = this.game.add.sprite(0,0, "room");
        this.roomBG.scale.setTo(this.game.width/this.roomBG.width,this.game.height/this.roomBG.height);
        this.player = new Player({
            game: this.game,
            x: this.game.width * 0.5,
            y: this.game.height * 0.5,
            asset: 'player'
        });
        this.game.add.existing(this.player);
        this.game.pickups = this.game.add.group();
        this.interiorGroup.add(this.roomBG);
        this.interiorGroup.add(this.player);
		
        this.game.input.keyboard.addKey(Phaser.KeyCode.K).onDown.add(() => {
			if(this.game.pseudoPause){
				this.game.sound.stopAll();
				this.game.sound.play('TransitionOutOfShip', 1, false);
				this.game.sound.play('ShipFlyingMusic', 1, true);
			}
			else{
				this.game.sound.stopAll();
				this.game.sound.play('TransitionIntoShip', 1, false);
				this.game.sound.play('InsideShipMusic', 1, true);
			}
			
            this.game.pseudoPause = !this.game.pseudoPause;
			
            this.ship.weapons[this.ship.currentWeapon].forEachExists((bullet)=>{
                if(!bullet.exists) {
                    return;
                };
                if(this.game.pseudoPause){
                    bullet.prevVel= {};
                    bullet.prevVel.x = bullet.body.velocity.x;
                    bullet.prevVel.y = bullet.body.velocity.y;
                    bullet.prevG = {"x":bullet.body.gravity.x,"y":bullet.body.gravity.y};
                    bullet.body.velocity.x = 0;
                    bullet.body.velocity.y = 0;
                    bullet.body.gravity.set(0,0);
                }else{
                    bullet.body.velocity.x = bullet.prevVel.x;
                    bullet.body.velocity.y = bullet.prevVel.y;
                    bullet.body.gravity.set(bullet.prevG.x,bullet.prevG.y);
                    bullet.prevG = null;
                    bullet.prevVel = null;
                }
            });

        });
		
		this.game.sound.play('ShipFlyingMusic', 1, true);
    }
    addPickup(){
      this.pickup = new Powerup({"game":this.game,"x":this.game.width,"y": this.game.height,"asset":"pickup","velocity":{"x":-75,"y": -20}});
      this.game.add.existing(this.pickup);
      this.game.pickups.add(this.pickup);
    }
    update () {
        if (this.game.pseudoPause) {
            this.interiorGroup.z = 200;
            this.game.shooterGroup.z = 100;
        } else {
            this.interiorGroup.z = 100;
            this.game.shooterGroup.z = 200;
            this.enemyGroup.fire();
            Object.values(this.ship.weapons).forEach((weapon) => {
                weapon.z = 220;
            });
            this.enemyGroup.forEachExists((enemy) => {
                enemy.weapon.z = 220;
            });
        }
        this.game.world.sort();
    }

}
