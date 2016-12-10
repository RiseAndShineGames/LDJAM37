import Phaser from 'phaser';
import Player from '../sprites/Player';

export default class extends Phaser.State {
  init () {}
  preload () {}
  create () {
    this.player = new Player({
      game: this.game,
      x: 5,
      y: 5,
      asset: 'player'
    } );
    this.player.animations.add('walk', [1,2,3],60,true)
    this.player.animations.play('walk');
  }
  update () {}
}
