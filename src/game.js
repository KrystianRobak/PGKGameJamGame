import PhaserMatterCollisionPlugin from 'phaser-matter-collision-plugin';
import GameScene from './scenes/GameScene'
import MainMenuScene from './scenes/MainMenuScene';
import PauseScene from './scenes/PauseScene';
import TutorialScene from './scenes/TutorialScene';
import GameOverScene from './scenes/GameOverScene';
import WinScene from './scenes/WinScene';
import CreditsScene from './scenes/CreditsScene';

export default new Phaser.Game({
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    scale: {
        mode: Phaser.Scale.HEIGHT_CONTROLS_WIDTH,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    audio: {
        disableWebAudio: true
    },
    physics: {
        default: 'matter',
        matter: {
            framerate: 60,
            // debug: {
            //     showBounds: false,
            //     boundsColor: 0xffffff,
            //     showBody: true,
            //     showStaticBody: true,
            //     showInternalEdges: true,
            //     showSensors: true,
            //     sensorFillColor: 0x0d177b,
            //     sensorLineColor: 0x1327e4,
    
            //     showPositions: true,
            //     positionSize: 4,
            //     positionColor: 0xe042da,
            //     showCollisions: true,
            //     collisionColor: 0xf5950c,
            // }
        }
    },
    scene: [MainMenuScene,GameScene,GameOverScene,PauseScene,TutorialScene, WinScene, CreditsScene],
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