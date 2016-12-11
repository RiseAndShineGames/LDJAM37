import Phaser from 'phaser';
import Ship from '../sprites/Ship';
import Player from '../sprites/Player';

export default class extends Phaser.State {
    init () {}
    preload () {}
    create () {
        this.spaceBG = this.game.add.sprite(0,0, "space");
        this.spaceBG.scale.setTo(this.game.width/this.spaceBG.width,this.game.height/this.spaceBG.height);
        this.ship = new Ship({
            game: this.game,
            x: 20,
            y: this.game.height * 0.5,
            asset: 'ship'
        });
        this.game.add.existing(this.ship);

        this.roomBG = this.game.add.sprite(0,0, "room");
        this.roomBG.scale.setTo(this.game.width/this.roomBG.width,this.game.height/this.roomBG.height);
        this.player = new Player({
            game: this.game,
            x: this.game.width * 0.5,
            y: this.game.height * 0.5,
            asset: 'player'
        });
        this.game.add.existing(this.player);

        this.game.input.keyboard.addKey(Phaser.KeyCode.K).onDown.add(() => {
            this.game.pseudoPause = !this.game.pseudoPause;
            this.ship.weapons[this.ship.currentWeapon].children.forEach((bullet)=>{
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
    update () {
        if (this.game.pseudoPause) {
            this.spaceBG.z = 100;
            this.ship.z = 120;
            this.roomBG.z = 200;
            this.player.z = 220;
        } else {
            this.spaceBG.z = 200;
            this.ship.z = 220;
            this.ship.weapons[this.ship.currentWeapon].z = 220;
            this.roomBG.z = 100;
            this.player.z = 120;
        }
        this.game.world.sort();
    }

}
