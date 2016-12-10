import 'pixi'
import 'p2'
import Phaser from 'phaser'

import BootState from './states/Boot'
import SplashState from './states/Splash'
import GameState from './states/Game'
import ShooterState from './states/Shooter'
import InteriorState from './states/Interior'

class Game extends Phaser.Game {

  constructor () {
    let width = document.documentElement.clientWidth > 1280 ? 1280 : document.documentElement.clientWidth
    let height = document.documentElement.clientHeight > 800 ? 800 : document.documentElement.clientHeight

    super(width, height, Phaser.AUTO, 'content', null)

    this.state.add('Boot', BootState, false)
    this.state.add('Splash', SplashState, false)
    this.state.add('Game', GameState, false)
    this.state.add('Shooter', ShooterState, false)
    this.state.add('Interior', InteriorState, false)

    this.state.start('Boot')
  }
}

window.game = new Game()
