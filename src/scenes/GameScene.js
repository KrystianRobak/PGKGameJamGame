import Phaser from '../../lib/phaser';
import Recorder from '../helpers/Recorder';
import AssetsKeys from '../helpers/AssetsKeys';
import playerSpritesheet from '../../assets/images/PlayerSpritesheet.png';
import playerSpritesheetjson from '../../assets/images/PlayerSpritesheet.json';
import PlayerController from '../PlayerController';

// import backgroundMiddleLevel1 from '../../levels/1/assets/background_Level1-1.png';
// import backgroundFarLevel1 from '../../levels/1/assets/background_Level1-2.png';
// import backgroundCloseLevel1 from '../../levels/1/assets/background_Level1-3.png';
// import backgroundGradientLevel1 from '../../levels/1/assets/background_Level1-4.png';
// import mapLevel1 from '../../levels/1/level1.json'

// import backgroundMiddleLevel2 from '../../levels/2/assets/background_Level2-1.png';
// import backgroundFarLevel2 from '../../levels/2/assets/background_Level2-2.png';
// import backgroundCloseLevel2 from '../../levels/2/assets/background_Level2-3.png';
// import backgroundGradientLevel2 from '../../levels/2/assets/background_Level2-4.png';
// import mapLevel2 from '../../levels/2/level2.json';

// import backgroundMiddleLevel3 from '../../levels/3/assets/background_Level3-1.png';
// import backgroundFarLevel3 from '../../levels/3/assets/background_Level3-2.png';
// import backgroundCloseLevel3 from '../../levels/3/assets/background_Level3-3.png';
// import backgroundGradientLevel3 from '../../levels/3/assets/background_Level3-4.png';
// import mapLevel3 from '../../levels/3/level3.json';

// import backgroundMiddleLevel4 from '../../levels/4/assets/background_Level4-1.png';
// import backgroundFarLevel4 from '../../levels/4/assets/background_Level4-2.png';
// import backgroundCloseLevel4 from '../../levels/4/assets/background_Level4-3.png';
// import backgroundGradientLevel4 from '../../levels/4/assets/background_Level4-4.png';
// import mapLevel4 from '../../levels/4/level4.json';

// import backgroundMiddleLevel5 from '../../levels/5/assets/background_Level5-1.png';
// import backgroundFarLevel5 from '../../levels/5/assets/background_Level5-2.png';
// import backgroundCloseLevel5 from '../../levels/5/assets/background_Level5-3.png';
// import backgroundGradientLevel5 from '../../levels/5/assets/background_Level5-4.png';
// import mapLevel5 from '../../levels/5/level5.json';

// import backgroundMiddleLevel6 from '../../levels/6/assets/background_Level6-1.png';
// import backgroundFarLevel6 from '../../levels/6/assets/background_Level6-2.png';
// import backgroundCloseLevel6 from '../../levels/6/assets/background_Level6-3.png';
// import backgroundGradientLevel6 from '../../levels/6/assets/background_Level6-4.png';
// import mapLevel6 from '../../levels/6/level6.json';

// import backgroundMiddleLevel7 from '../../levels/7/assets/background_Level7-1.png';
// import backgroundFarLevel7 from '../../levels/7/assets/background_Level7-2.png';
// import backgroundCloseLevel7 from '../../levels/7/assets/background_Level7-3.png';
// import backgroundGradientLevel7 from '../../levels/7/assets/background_Level7-4.png';
// import mapLevel7 from '../../levels/7/level7.json';

import EnemyController from '../EnemyController';

import tiles from '../../assets/images/levelSprites.png';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super("game");
        this.platforms = [] 
        this.dangerous = []
        this.recordingPoints = [];

        this.background = null;
        this.backgroundMiddle = null;
        this.backgroundFar = null;
        this.backgroundClose = null;

        this.map = null;

        this.tileset = null;
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
        progressBox.fillRect(240, 270, 320, 50);

        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        var percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        var assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        assetText.setOrigin(0.5, 0.5);

        this.load.on('progress', function (value) {
            console.log(value);
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
            percentText.setText(parseInt(value * 100) + '%');
            assetText.setText('Loading asset: ' + file.src);
        });
                    
        this.load.on('fileprogress', function (file) {
            console.log(file.src);
        });
        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
            console.log('complete');
        });

        this.load.atlas(AssetsKeys.PLAYER, playerSpritesheet, playerSpritesheetjson);
        this.load.image(AssetsKeys.TILESET, tiles);

        this.load.image(AssetsKeys.Level1.BACKGROUNDGRADIENT, backgroundGradient);
        this.load.image(AssetsKeys.Level1.BACKGROUNDMIDDLE, backgroundMiddle);
        this.load.image(AssetsKeys.Level1.BACKGROUNDFAR, backgroundFar);
        this.load.image(AssetsKeys.Level1.BACKGROUNDCLOSE, backgroundClose);

        for (let level = 1; level <= 7; level++) {
            const backgroundMiddle = require(`../../levels/${level}/assets/background_Level${level}-1.png`).default;
            const backgroundFar = require(`../../levels/${level}/assets/background_Level${level}-2.png`).default;
            const backgroundClose = require(`../../levels/${level}/assets/background_Level${level}-3.png`).default;
            const backgroundGradient = require(`../../levels/${level}/assets/background_Level${level}-4.png`).default;
            const mapLevel = require(`../../levels/${level}/level${level}.json`).default;
            
            this.load.image(AssetsKeys[`Level${level}`].BACKGROUNDGRADIENT, backgroundGradient);
            this.load.image(AssetsKeys[`Level${level}`].BACKGROUNDMIDDLE, backgroundMiddle);
            this.load.image(AssetsKeys[`Level${level}`].BACKGROUNDFAR, backgroundFar);
            this.load.image(AssetsKeys[`Level${level}`].BACKGROUNDCLOSE, backgroundClose);
            this.load.tilemapTiledJSON(AssetsKeys.[`Level${level}`].TILEMAP, mapLevel)
        }
    }

    init() {
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    create() {
        this.recordingFrame = 0;
        this.matter.world.setBounds(0, 0, this.game.scale.gameSize.width*3, this.game.scale.gameSize.height*3);
        this.lights.enable().setAmbientColor(0x111111);

        
        this.num = 0;
        
        this.playerController = new PlayerController(this);
        //this.enemyController = new EnemyController(this, 2);
        this.swapLevel(AssetsKeys.Level1);
        this.cameras.main.startFollow(this.playerController.playerSprite);
        //this.player.createAnimations();

        this.recorder = new Recorder();
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
        //this.enemyController.UpdateEnemies(this.num);
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

        // // this.background.tilePositionY += this.playerController.playerSprite.body.velocity.y * 0.025;
        // this.backgroundFar.tilePositionY += this.playerController.playerSprite.body.velocity.y * 0.05;
        // // this.backgroundMiddle.tilePositionY += this.playerController.playerSprite.body.velocity.y * 0.1;
        // // this.backgroundClose.tilePositionY += this.playerController.playerSprite.body.velocity.y * 0.05;
    }

    clearLevel() {
        this.platforms.forEach(elem => {
            this.matter.world.remove(elem);
        });
        this.dangerous.forEach(elem => {
            this.matter.world.remove(elem);
        });
        this.recordingPoints.forEach(elem => {
            this.matter.world.remove(elem);
        });

        this.platforms = [] 
        this.dangerous = []
        this.recordingPoints = [];

        this.background = null;
        this.backgroundMiddle = null;
        this.backgroundFar = null;
        this.backgroundClose = null;

        this.map = null;

        this.platformLayer.destroy();
        //this.dangerousLayer.destroy();

        this.platformLayer = null;
        this.dangerousLayer = null;

        this.platformBodies = null;

        this.recordingBodies = null;
    }

    swapLevel(keys) {
        this.playerController.playerSprite.setPosition(230, 800)

        this.background = this.add.tileSprite(0,0,1920,1080,keys.BACKGROUNDGRADIENT).setOrigin(0)
        this.backgroundMiddle = this.add.tileSprite(0,0,1920,1080,keys.BACKGROUNDMIDDLE).setOrigin(0)
        this.backgroundFar = this.add.tileSprite(0,0,1920,1080,keys.BACKGROUNDFAR).setOrigin(0)
        this.backgroundClose = this.add.tileSprite(0,0,1920,1080,keys.BACKGROUNDCLOSE).setOrigin(0)

        this.background.setPipeline('Light2D');
        this.backgroundMiddle.setPipeline('Light2D');
        this.backgroundFar.setPipeline('Light2D');
        this.background.setPipeline('Light2D');

        this.map = this.make.tilemap({key: keys.TILEMAP, tileWidth: 60, tileHeight: 60});
        this.tileset = this.map.addTilesetImage("levelSprites", AssetsKeys.TILESET);
        this.platformLayer = this.map.createLayer("Platforms", this.tileset, 0, 0);
        this.dangerousLayer = this.map.createLayer("Dangerous", this.tileset, 0, 0);

        var platformBodies = this.map.getObjectLayer("PlatformsBodies");
        platformBodies.objects.forEach(obj => {
            const label = platformBodies.properties[0].value;
            var platform = this.matter.add.rectangle(obj.x + obj.width / 2, obj.y + obj.height / 2, obj.width, obj.height, { label: label, isStatic: true});
            this.platforms.push(platform);
        });

        var recordingBodies = this.map.getObjectLayer("RecordingPoints");
        recordingBodies.objects.forEach(obj => {
            const label = obj.properties[0].value;
            var recordingPoint = this.matter.add.rectangle(obj.x + obj.width / 2, obj.y + obj.height / 2, obj.width, obj.height, { label: label, isStatic: true,isSensor: true});
            this.recordingPoints.push(recordingPoint);
        });
    }
}
