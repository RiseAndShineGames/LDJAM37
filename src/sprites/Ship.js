import Phaser from 'phaser'
import SingleShot from '../weapons/SingleShot';
import SpreadShot from '../weapons/SpreadShot';
import TwinCannons from '../weapons/TwinCannons';
import Beam from '../weapons/Beam';

export default class extends Phaser.Sprite {

    constructor ({ game, x, y, asset }) {
        super(game, x, y, asset)

        // Init variables
        this.game = game
        this.anchor.setTo(0, 0.5)
        this.scale.setTo(this.game.width / this.width * 0.08, this.game.height / this.height * 0.12);
        this.speed = 350
        this.deltaSpeed = 20
        this.currentWeapon = "default"

        // Physics and cursors
        this.game.physics.arcade.enable(this)
        this.body.collideWorldBounds = true;
        this.body.bounce.setTo(0.5);
        this.cursors = this.game.input.keyboard.addKeys({
            "up": Phaser.KeyCode.W,
            "up_alt": Phaser.KeyCode.UP,
            "down": Phaser.KeyCode.S,
            "down_alt": Phaser.KeyCode.DOWN,
            "shoot": Phaser.KeyCode.SPACEBAR,
            "left": Phaser.KeyCode.A,
            "left_alt": Phaser.KeyCode.LEFT,
            "right": Phaser.KeyCode.D,
            "right_alt": Phaser.KeyCode.RIGHT,
            "change": Phaser.KeyCode.ENTER
        })

        // Change Weapons
        this.cursors.change.onDown.add(() => {
            switch (this.currentWeapon) {
                case "default":
                    this.currentWeapon = "twincannons";
                    break;
                case "twincannons":
                    this.currentWeapon = "spreadShot";
                    break;
                case "spreadShot":
                    this.currentWeapon = "beam";
                    break;
                case "beam":
                    this.currentWeapon = "default";
                    break;
            }
        })


        // Setup Weapons
        this.weapons = {
            default: new SingleShot(this.game),
            spreadShot: new SpreadShot(this.game),
            twincannons: new TwinCannons(this.game),
            beam: new Beam(this.game),
        }

    }
    pickupPowerup(ship, powerup){
      this.game.newPowerup = true;
      powerup.destroy();
      this.game.pseudoPause = !this.game.pseudoPause;
      ship.weapons[ship.currentWeapon].children.forEach((bullet)=>{
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
    }

    addEnemies(enemies) {
        this.enemies = enemies;
    }

    update () {
        if (this.game.pseudoPause) {
            this.body.velocity.y = 0;
            this.body.velocity.x = 0;
            return;
        }

        this.game.physics.arcade.overlap(this.enemies, this.weapons[this.currentWeapon], this.shotEnemy, null, this);

        if ((this.cursors.up.isDown || this.cursors.up_alt.isDown) && this.body.velocity.y > this.speed * -1) {
            this.body.velocity.y -= this.deltaSpeed;
        } else if ((this.cursors.down.isDown || this.cursors.down_alt.isDown) && this.body.velocity.y < this.speed) {
            this.body.velocity.y += this.deltaSpeed;
        } else {
            if (this.body.velocity.y < 0) {
                this.body.velocity.y += this.deltaSpeed;
            } else if (this.body.velocity.y > 0) {
                this.body.velocity.y -= this.deltaSpeed;
            } else {
                this.body.velocity.y = 0;
            }
        }
        if((this.cursors.left.isDown || this.cursors.left_alt.isDown)
        && !(this.cursors.right.isDown || this.cursors.right_alt.isDown) ){
          this.body.velocity.x = -this.speed;
        }else if ((this.cursors.right.isDown || this.cursors.right_alt.isDown)
        && !(this.cursors.left.isDown || this.cursors.left_alt.isDown) && this.body.position.x <= this.game.width *0.45 ) {
          this.body.velocity.x = this.speed;
        }else{
          this.body.velocity.x = 0;
        }

        if (this.cursors.shoot.isDown) {
            this.weapons[this.currentWeapon].fire(this);
        }
        this.game.physics.arcade.overlap(this, this.game.pickups,this.pickupPowerup,null,this);
    }

    shotEnemy(enemy, bullet) {
        enemy.health -= 1;
        bullet.kill();
    }

}
