import GameScene from './scenes/GameScene'

export default new Phaser.Game({
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    scale: {
        mode: Phaser.Scale.HEIGHT_CONTROLS_WIDTH,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'matter',
        matter: {
            gravity: {
                y: 0.5
            },
            framerate: 30
            //debug: true
        }
    },
    scene: [GameScene]
});