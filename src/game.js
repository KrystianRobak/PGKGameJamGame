import PhaserMatterCollisionPlugin from 'phaser-matter-collision-plugin';
import GameScene from './scenes/GameScene'
import MainMenuScene from './scenes/MainMenuScene';
import LevelSelectionScene from './scenes/LevelSelectionScene';
import PauseScene from './scenes/PauseScene';

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
            framerate: 60,
            debug: {
                showBounds: false,
                boundsColor: 0xffffff,
                showBody: true,
                showStaticBody: true,
                showInternalEdges: true,
                showSensors: true,
                sensorFillColor: 0x0d177b,
                sensorLineColor: 0x1327e4,
    
                showPositions: true,
                positionSize: 4,
                positionColor: 0xe042da,
                showCollisions: true,
                collisionColor: 0xf5950c,
            }
        }
    },
    scene: [MainMenuScene,GameScene,LevelSelectionScene,PauseScene],
    plugins: {
        scene: [
            {
                plugin: PhaserMatterCollisionPlugin,
                key: "matterCollision",
                mapping: "matterCollision"
            }
        ]
    }
});