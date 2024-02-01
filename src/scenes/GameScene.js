import Phaser from '../../lib/phaser';
import AssetsKeys from '../helpers/AssetsKeys';
import playerSpritesheet from '../../assets/images/PlayerSpritesheet.png';
import playerSpritesheetjson from '../../assets/images/PlayerSpritesheet.json';
import PlayerController from '../PlayerController';

import backgroundMiddle from '../../assets/images/background_1.png';
import backgroundFar from '../../assets/images/background_2.png';
import backgroundClose from '../../assets/images/background_3.png';

import backgroundGradient from '../../assets/images/background_4.png';
import EnemyController from '../EnemyController';


import tiles from '../test.png';
import mapJson from '../map.json';


export default class GameScene extends Phaser.Scene {
    constructor() {
        super("game");
    }

    preload() {
        this.load.atlas(AssetsKeys.PLAYER, playerSpritesheet, playerSpritesheetjson);
        
        this.load.image(AssetsKeys.Level1.BACKGROUNDGRADIENT, backgroundGradient);
        this.load.image(AssetsKeys.Level1.BACKGROUNDMIDDLE, backgroundMiddle);
        this.load.image(AssetsKeys.Level1.BACKGROUNDFAR, backgroundFar);
        this.load.image(AssetsKeys.Level1.BACKGROUNDCLOSE, backgroundClose);

        this.load.image(AssetsKeys.TILESET, tiles);
        this.load.tilemapTiledJSON(AssetsKeys.Level1.TILEMAP, mapJson)
    }

    init() {
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    create() {

        this.matter.world.setBounds(0, 0, this.game.scale.gameSize.width, this.game.scale.gameSize.height);
        this.lights.enable().setAmbientColor(0x111111);

        this.swapLevel(AssetsKeys.Level1);
        
        console.log(this.platforms);
        this.playerController = new PlayerController(this);
        this.enemyController = new EnemyController(this, 1);

        //this.cameras.main.startFollow(this.playerController.playerSprite);
        //this.player.createAnimations();
    }

    update() {
        this.paralax();

        this.playerController.playerSprite.stateMachine.step();
        //console.log(this.playerController.playerSprite.stateMachine.state);
        this.enemyController.UpdateEnemies();
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

    swapLevel(keys) {
        this.background = this.add.tileSprite(0,0,1920,1080,keys.BACKGROUNDGRADIENT).setOrigin(0)
        this.backgroundMiddle = this.add.tileSprite(0,0,1920,1080,keys.BACKGROUNDMIDDLE).setOrigin(0)
        this.backgroundFar = this.add.tileSprite(0,0,1920,1080,keys.BACKGROUNDFAR).setOrigin(0)
        this.backgroundClose = this.add.tileSprite(0,0,1920,1080,keys.BACKGROUNDCLOSE).setOrigin(0)

        this.background.setPipeline('Light2D');
        this.backgroundMiddle.setPipeline('Light2D');
        this.backgroundFar.setPipeline('Light2D');
        this.background.setPipeline('Light2D');

        const light = this.lights.addLight(180, 80, 200).setColor(0xffffff).setIntensity(2);

        this.map = this.make.tilemap({key: keys.TILEMAP, tileWidth: 60, tileHeight: 60});

        const tileset = this.map.addTilesetImage("test", AssetsKeys.TILESET);
        this.platformLayer = this.map.createLayer("Platforms", tileset, 0, 0);
        //this.platformLayer.setPipeline('Light2D');

        this.dangerousLayer = this.map.createLayer("Dangerous", tileset, 0, 0);
        this.platforms = [] 
        this.dangerous = []

        this.platformLayer.forEachTile(tile => {
            if(tile.index > 0) {
                this.platforms.push(this.matter.add.rectangle(tile.getCenterX(), tile.getCenterY(), tile.width, tile.height, {label: this.platformLayer.layer.properties[0].value,isStatic: true}, this));
            }
        });

        this.dangerousLayer.forEachTile(tile => {
            if(tile.index > 0) {
                this.dangerous.push(this.matter.add.rectangle(tile.getCenterX(), tile.getCenterY(), tile.width, tile.height, {label: this.dangerousLayer.layer.properties[0].value,isStatic: true}, this));
            }
        });

        console.log(this.dangerous)
    }
}
