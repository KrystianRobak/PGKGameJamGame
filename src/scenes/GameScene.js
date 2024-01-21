import Phaser from '../../lib/phaser';
import AssetsKeys from '../helpers/AssetsKeys';
import playerSpritesheet from '../../assets/images/PlayerSpritesheet.png';
import playerSpritesheetjson from '../../assets/images/PlayerSpritesheet.json';
import imagesheet from '../../assets/images/images.png';
import imagesheetjson from '../../assets/images/imagesheet.json';
import PlayerController from '../PlayerController';


import backgroundMiddle from '../../assets/images/background_1.png';
import backgroundFar from '../../assets/images/background_2.png';
import backgroundClose from '../../assets/images/background_3.png';

import backgroundGradient from '../../assets/images/background_4.png';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super("game");
    }

    preload() {
        this.load.atlas(AssetsKeys.IMAGES, imagesheet, imagesheetjson);
        this.load.atlas(AssetsKeys.PLAYER, playerSpritesheet, playerSpritesheetjson);
        this.load.image('backgroundGradient', backgroundGradient);
        this.load.image('backgroundMiddle', backgroundMiddle);
        this.load.image('backgroundFar', backgroundFar);
        this.load.image('backgroundClose', backgroundClose);
    }

    init() {
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    create() {

        this.matter.world.setBounds(0, 0, this.game.scale.gameSize.width, this.game.scale.gameSize.height);
        //this.lights.enable().setAmbientColor(0x111111);

        this.background = this.add.tileSprite(0,0,1920,1080,'backgroundGradient').setOrigin(0)
        this.backgroundMiddle = this.add.tileSprite(0,0,1920,1080,'backgroundMiddle').setOrigin(0)
        this.backgroundFar = this.add.tileSprite(0,0,1920,1080,'backgroundFar').setOrigin(0)
        this.backgroundClose = this.add.tileSprite(0,0,1920,1080,'backgroundClose').setOrigin(0)


        //this.background.setPipeline('Light2D');
        //this.backgroundMiddle.setPipeline('Light2D');
        //this.backgroundFar.setPipeline('Light2D');
        //this.background.setPipeline('Light2D');


        const light = this.lights.addLight(180, 80, 200).setColor(0xffffff).setIntensity(2);

        this.platforms = this.createPlatforms();

        this.playerController = new PlayerController(this);

        //this.cameras.main.startFollow(this.playerController.playerSprite);
        //this.player.createAnimations();
    }


    createPlatforms() {
        const platformArrPos = [
            {
                x:200,
                y:310
            },
            {
                x:400,
                y:140
            },
            {
                x:100,
                y:900
            },
            {
                x:500,
                y:900
            }
        ]

        var platformArr = []

        platformArrPos.forEach(element => {
            var platform = this.matter.add.image(element.x, element.y, AssetsKeys.IMAGES, 'black', { label: "platform" }).setStatic(true);
            platformArr.push(platform);
        })

        return platformArr;
    }

    update() {
        this.background.tilePositionX += this.playerController.playerSprite.body.velocity.x * 0.025;
        this.backgroundFar.tilePositionX += this.playerController.playerSprite.body.velocity.x * 0.05;
        this.backgroundMiddle.tilePositionX += this.playerController.playerSprite.body.velocity.x * 0.1;
        this.backgroundClose.tilePositionX += this.playerController.playerSprite.body.velocity.x * 0.2;

        // this.background.tilePositionY += this.playerController.playerSprite.body.velocity.y * 0.025;
        this.backgroundFar.tilePositionY += this.playerController.playerSprite.body.velocity.y * 0.05;
        // this.backgroundMiddle.tilePositionY += this.playerController.playerSprite.body.velocity.y * 0.1;
        // this.backgroundClose.tilePositionY += this.playerController.playerSprite.body.velocity.y * 0.05;

        this.playerController.playerSprite.stateMachine.step();
    }
}
