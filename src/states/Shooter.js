import Phaser from 'phaser';
import Ship from '../sprites/Ship';
import Player from '../sprites/Player';

export default class extends Phaser.State {
    init () {}
    preload () {}
    create () {
        this.bg = this.game.add.sprite(0,0, "space");
        this.bg.scale.setTo(this.game.width/this.bg.width,this.game.height/this.bg.height);
        this.ship = new Ship({
            game: this.game,
            x: 20,
            y: this.game.height * 0.5,
            asset: 'ship'
        });
        this.game.add.existing(this.ship);

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

            //console.log(this.ship.weapons[this.ship.currentWeapon].children);


            //this.game.physics.arcade.isPaused = !this.game.physics.arcade.isPaused;

        });
    }
    update () {
    }

}
