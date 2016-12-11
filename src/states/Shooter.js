import Phaser from 'phaser';
import Ship from '../sprites/Ship';
import Enemy from '../sprites/Enemy';
import Player from '../sprites/Player';
import Powerup from '../sprites/Powerup';

export default class extends Phaser.State {
    init () {}
    preload () {}
    create () {

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.shooterGroup = this.game.add.group();
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
        this.shooterGroup.add(this.spaceBG);
        this.shooterGroup.add(this.ship);

        this.enemyGroup = this.game.add.group();
        this.enemy = new Enemy({
            game: this.game,
            player: this.ship,
            x: this.game.width - 100,
            y: this.game.height * 0.5,
            weapon: null
        });
        this.game.add.existing(this.enemy);
        this.enemyGroup.add(this.enemy);
        this.shooterGroup.add(this.enemyGroup);
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
    }
    addPickup(){
      this.pickup = new Powerup({"game":this.game,"x":this.game.width,"y": this.game.height,"asset":"pickup","velocity":{"x":-75,"y": -20}});
      this.game.add.existing(this.pickup);
      this.game.pickups.add(this.pickup);
    }
    update () {
        if (this.game.pseudoPause) {
            this.interiorGroup.z = 200;
            this.shooterGroup.z = 100;
        } else {
            this.interiorGroup.z = 100;
            this.shooterGroup.z = 200;
            Object.values(this.ship.weapons).forEach((weapon) => {
                weapon.z = 220;
            });
            this.enemy.weapon.z = 220;
        }
        this.game.world.sort();
    }

}
