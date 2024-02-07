import Phaser from '../../lib/phaser';
import Recorder from '../helpers/Recorder';
import AssetsKeys from '../helpers/AssetsKeys';

import playerSpritesheet from '../../assets/images/PlayerSpritesheet.png';
import playerSpritesheetjson from '../../assets/images/PlayerSpritesheet.json';
import hook from '../../assets/images/hook.png';

import PlayerController from '../PlayerController';

import backgroundMiddleLevel1 from '../../assets/images/level1/background_Level1-1.png';
import backgroundFarLevel1 from '../../assets/images/level1/background_Level1-2.png';
import backgroundCloseLevel1 from '../../assets/images/level1/background_Level1-3.png';
import backgroundGradientLevel1 from '../../assets/images/level1/background_Level1-4.png';

// Level 2
import backgroundMiddleLevel2 from '../../assets/images/level2/background_Level1-1.png';
import backgroundFarLevel2 from '../../assets/images/level2/background_Level1-2.png';
import backgroundCloseLevel2 from '../../assets/images/level2/background_Level1-3.png';
import backgroundGradientLevel2 from '../../assets/images/level2/background_Level1-4.png';

// Level 2
import backgroundMiddleLevel3 from '../../assets/images/level3/background_Level1-1.png';
import backgroundFarLevel3 from '../../assets/images/level3/background_Level1-2.png';
import backgroundCloseLevel3 from '../../assets/images/level3/background_Level1-3.png';
import backgroundGradientLevel3 from '../../assets/images/level3/background_Level1-4.png';

// Level 3
import backgroundMiddleLevel4 from '../../assets/images/level4/background_Level1-1.png';
import backgroundFarLevel4 from '../../assets/images/level4/background_Level1-2.png';
import backgroundCloseLevel4 from '../../assets/images/level4/background_Level1-3.png';
import backgroundGradientLevel4 from '../../assets/images/level4/background_Level1-4.png';

import mapLevel1 from '../../levels/1/level1.json';
import mapLevel2 from '../../levels/2/level2.json';
import mapLevel3 from '../../levels/3/level3.json';
import mapLevel4 from '../../levels/4/level4.json';

import enemyLevel1Recording1 from '../../levels/1/level1enemy1.json'

import enemyLevel2Recording1 from '../../levels/2/level2enemy2.json'

import enemyLevel3Recording1 from '../../levels/3/level3enemy3.json'

import enemyLevel4Recording1 from '../../levels/4/level4enemy4.json'

import EnemyController from '../EnemyController';

import tiles from '../../assets/images/levelSprites.png';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super("game");
        this.levels = [
            AssetsKeys.Level2,
            AssetsKeys.Level3,
            AssetsKeys.Level4,
        ]

        this.Level1Recordings = [
            enemyLevel1Recording1,
        ]

        this.Level2Recordings = [
            enemyLevel2Recording1,
        ]

        this.Level3Recordings = [
            enemyLevel3Recording1,
        ]

        this.Level4Recordings = [
            enemyLevel4Recording1,
        ]
        
        this.LevelRecordings = [
            this.Level1Recordings,
            this.Level2Recordings,
            this.Level3Recordings,
            this.Level4Recordings
        ]


        this.platforms = [] 
        this.dangerous = []
        this.gamePoints = [];
        this.recordingPoints = [];

        this.background = null;
        this.backgroundMiddle = null;
        this.backgroundFar = null;
        this.backgroundClose = null;

        this.platformLayer = null;
        this.dangerousLayer = null;

        this.platformBodies = null;
        this.recordingBodies = null;

        this.playerController = null;
    }

    preload() {
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();

        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(480, 540, 960, 100);

        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 100,
            text: 'Loading...',
            style: {
                font: '40px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        var percentText = this.make.text({
            x: width / 2,
            y: height / 2 + 45,
            text: '0%',
            style: {
                font: '36px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        var assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 150,
            text: '',
            style: {
                font: '36px monospace',
                fill: '#ffffff'
            }
        });
        assetText.setOrigin(0.5, 0.5);

        this.load.on('progress', function (value) {
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(520, 570, 880 * value, 60);
            percentText.setText(parseInt(value * 100) + '%');
        });

        this.load.on('fileprogress', function (file) {
            assetText.setText('Loading asset: ' + file.key);
        });

        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
        });

        this.load.image(AssetsKeys.HOOK, hook);

        this.load.atlas(AssetsKeys.PLAYER, playerSpritesheet, playerSpritesheetjson);
        this.load.image(AssetsKeys.TILESET, tiles);

        this.load.image(AssetsKeys.Level1.BACKGROUNDGRADIENT, backgroundGradientLevel1);
        this.load.image(AssetsKeys.Level1.BACKGROUNDMIDDLE, backgroundMiddleLevel1);
        this.load.image(AssetsKeys.Level1.BACKGROUNDFAR, backgroundFarLevel1);
        this.load.image(AssetsKeys.Level1.BACKGROUNDCLOSE, backgroundCloseLevel1);

        this.load.image(AssetsKeys.Level2.BACKGROUNDGRADIENT, backgroundGradientLevel2);
        this.load.image(AssetsKeys.Level2.BACKGROUNDMIDDLE, backgroundMiddleLevel2);
        this.load.image(AssetsKeys.Level2.BACKGROUNDFAR, backgroundFarLevel2);
        this.load.image(AssetsKeys.Level2.BACKGROUNDCLOSE, backgroundCloseLevel2);

        this.load.image(AssetsKeys.Level3.BACKGROUNDGRADIENT, backgroundGradientLevel3);
        this.load.image(AssetsKeys.Level3.BACKGROUNDMIDDLE, backgroundMiddleLevel3);
        this.load.image(AssetsKeys.Level3.BACKGROUNDFAR, backgroundFarLevel3);
        this.load.image(AssetsKeys.Level3.BACKGROUNDCLOSE, backgroundCloseLevel3);

        this.load.image(AssetsKeys.Level4.BACKGROUNDGRADIENT, backgroundGradientLevel4);
        this.load.image(AssetsKeys.Level4.BACKGROUNDMIDDLE, backgroundMiddleLevel4);
        this.load.image(AssetsKeys.Level4.BACKGROUNDFAR, backgroundFarLevel4);
        this.load.image(AssetsKeys.Level4.BACKGROUNDCLOSE, backgroundCloseLevel4);

        this.load.tilemapTiledJSON(AssetsKeys.Level1.TILEMAP, mapLevel1);
        this.load.tilemapTiledJSON(AssetsKeys.Level2.TILEMAP, mapLevel2);
        this.load.tilemapTiledJSON(AssetsKeys.Level3.TILEMAP, mapLevel3);
        this.load.tilemapTiledJSON(AssetsKeys.Level4.TILEMAP, mapLevel4);
    }

    init() {
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    create() {
        this.recordingFrame = 0;
        this.matter.world.setBounds(0, 0, 6300, 3600);
        this.lights.enable().setAmbientColor(0x111111);
        
        this.num = 0;
        this.swapLevel(AssetsKeys.Level1);
        this.playerController = new PlayerController(this);
        this.playerController.playerSprite.setPosition(200, 3400)
        
        this.cameras.main.startFollow(this.playerController.playerSprite);
        this.playerController.playerSprite.createAnimations();

        this.recorder = new Recorder();

        const esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)
        esc.on('down', () => {
            this.scene.switch('Pause')
        })
    }

    reset() {
        this.levels = [
            AssetsKeys.Level2,
            AssetsKeys.Level3,
            AssetsKeys.Level4,
        ]
        console.log("reset be likeee")
        console.log(this.Level1Recordings);
        console.log(this.LevelRecordingsB);
        this.LevelRecordings = [
            this.Level1Recordings,
            this.Level2Recordings,
            this.Level3Recordings,
            this.Level4Recordings
        ];
        this.clearLevel();
        this.swapLevel(AssetsKeys.Level1);
        this.playerController.playerSprite.setPosition(200, 3400);
        this.playerController.playerSprite.setVelocity(0,0);
    }

    update() {
        this.paralax();

        this.playerController.playerSprite.stateMachine.step();
        if (this.isRecording) {
            if( this.recordingFrame == 10) {
                this.recorder.recordFrame(this.playerController.playerSprite, this.cursors);
                this.recordingFrame = 0;
            }
            this.recordingFrame = this.recordingFrame + 1;
        }
        this.enemyController.UpdateEnemies(this.num);
        if(this.num == 10) {
            this.num = 0;
        }
        this.num++;
    }

    startRecording() {
        console.log('Recording started');
        this.isRecording = true;
    }

    stopRecording() {
        console.log('Recording stopped');
        this.isRecording = false;
        
        this.recorder.saveRecording();
    }

    paralax() {
        this.background.tilePositionX += this.playerController.playerSprite.body.velocity.x * 0.025;
        this.backgroundFar.tilePositionX += this.playerController.playerSprite.body.velocity.x * 0.05;
        this.backgroundMiddle.tilePositionX += this.playerController.playerSprite.body.velocity.x * 0.1;
        this.backgroundClose.tilePositionX += this.playerController.playerSprite.body.velocity.x * 0.2;
    }

    clearLevel() {
        this.platforms.forEach(elem => {
            this.matter.world.remove(elem);
        });
        this.dangerous.forEach(elem => {
            this.matter.world.remove(elem);
        });
        this.gamePoints.forEach(elem => {
            this.matter.world.remove(elem);
        });
        this.recordingPoints.forEach(elem => {
            this.matter.world.remove(elem);
        });
        this.enemyController.enemies.forEach(elem => {
            elem.destroy();
        });

        this.platforms = [] 
        this.dangerous = []
        this.gamePoints = [];
        this.recordingPoints = [];

        this.background.destroy()
        this.backgroundMiddle.destroy()
        this.backgroundFar.destroy()
        this.backgroundClose.destroy()


        this.platformLayer.destroy();
        this.dangerousLayer.destroy();

        this.platformLayer.destroy()
        this.dangerousLayer.destroy()

    }

    swapLevel(keys) {
        this.background = this.add.tileSprite(0,0,1920,1080,keys.BACKGROUNDGRADIENT).setOrigin(0)
        this.backgroundFar = this.add.tileSprite(0,0,1920,1080,keys.BACKGROUNDFAR).setOrigin(0)
        this.backgroundMiddle = this.add.tileSprite(0,0,1920,1080,keys.BACKGROUNDMIDDLE).setOrigin(0)
        this.backgroundClose = this.add.tileSprite(0,0,1920,1080,keys.BACKGROUNDCLOSE).setOrigin(0)

        this.background.setScrollFactor(0);
        this.backgroundMiddle.setScrollFactor(0);
        this.backgroundFar.setScrollFactor(0);
        this.backgroundClose.setScrollFactor(0);

        this.map = this.make.tilemap({key: keys.TILEMAP, tileWidth: 180, tileHeight: 180});
        this.tileset = this.map.addTilesetImage("levelSprites", AssetsKeys.TILESET);
        this.dangerousLayer = this.map.createLayer("Dangerous", this.tileset, 0, 0);
        this.platformLayer = this.map.createLayer("Platforms", this.tileset, 0, 0);

        var platformBodies = this.map.getObjectLayer("PlatformBodies");

        var dangerousBodies = this.map.getObjectLayer("DangerousBodies");
        dangerousBodies.objects.forEach(obj => {
            const label = dangerousBodies.properties[0].value;
            var platform = this.matter.add.rectangle(obj.x + obj.width / 2, obj.y + obj.height / 2, obj.width, obj.height, { label: label, isStatic: true});
            this.dangerous.push(platform);
        });


        platformBodies.objects.forEach(obj => {
            const label = platformBodies.properties[0].value;
            var platform = this.matter.add.rectangle(obj.x + obj.width / 2, obj.y + obj.height / 2, obj.width, obj.height, { label: label, isStatic: true});
            this.platforms.push(platform);
        });

        var gamePoints = this.map.getObjectLayer("GamePoints");
        gamePoints.objects.forEach(obj => {
            const label = obj.properties[0].value;
            var platform = this.matter.add.rectangle(obj.x + obj.width / 2, obj.y + obj.height / 2, obj.width, obj.height, { label: label, isStatic: true, isSensor: true});
            this.gamePoints.push(platform);
        });

        // var recordingBodies = this.map.getObjectLayer("RecordingPoints");
        // recordingBodies.objects.forEach(obj => {
        //     console.log(obj)
        //     const label = obj.properties[0].value;
        //     var recordingPoint = this.matter.add.rectangle(obj.x + obj.width / 2, obj.y + obj.height / 2, obj.width, obj.height, { label: label, isStatic: true,isSensor: true});
        //     this.recordingPoints.push(recordingPoint);
        // });
        this.cameras.main.setBounds(0, 0, 6300, 3600);
        this.enemyController = new EnemyController(this, 1, this.LevelRecordings[0]);

        if(this.playerController)
             this.children.bringToTop(this.playerController.playerSprite);
    }
}
