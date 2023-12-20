import GameScene from './scenes/GameScene'

export default new Phaser.Game({
    type: Phaser.AUTO,
    width: 804,
    height: 675,
    scale: {
        mode: Phaser.Scale.HEIGHT_CONTROLS_WIDTH,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'matter',
        matter: {
            gravity: {
                y: 0
            },
            //debug: true
        }
    },
    scene: [GameScene]
});