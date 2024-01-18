import Phaser from '../../lib/phaser';
import AssetsKeys from '../helpers/AssetsKeys';
import PlayerSprite from '../sprites/PlayerSprite';
import spritesheet from '../../assets/images/spritesheet.png';
import spritesheetjson from '../../assets/images/spritesheet.json';
import imagesheet from '../../assets/images/images.png';
import imagesheetjson from '../../assets/images/imagesheet.json';
import charsheet from '../../assets/images/charsheet.json';
import sheet from '../../assets/images/sheet.png';
import CollisionCategories from '../helpers/CollisionCategories';
import configs from '../helpers/configs';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super("game");
    }

    preload() {
        this.load.atlas(AssetsKeys.IMAGES, imagesheet,imagesheetjson);
        this.load.atlas(AssetsKeys.TEXTURES, sheet, charsheet);
        this.load.image('ground', 'https://labs.phaser.io/src/games/firstgame/assets/platform.png');
    }

    init() {
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    create() {
        this.matter.world.setBounds(0, 0, this.game.scale.gameSize.width, this.game.scale.gameSize.height);
        this.cameras.main.setBackgroundColor('#000000');

        // Add platforms
        this.platforms = this.createPlatforms();

        this.player = new PlayerSprite(
            this,
            0,
            this.game.scale.gameSize.height / 2
        );

        this.addCollisions();
       // this.player.createAnimations();
       // this.player.startAnimation();
    }

    addCollisions() {
        this.matter.world.on("collisionstart", (event, bodyA, bodyB) => {
            if ((bodyA.label == "laser" && bodyB.label == "platform") || (bodyB.label == "laser" && bodyA.label == "platform")) {
                this.events.emit('hookHit');
                this.player.shootingHook = false;
            }
        });
    }

    createPlatforms() {
        const platformArrPos = [
            {
                x:200,
                y:310
            },
            {
                x:400,
                y:100
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
            platformArr.push(this.matter.add.image(element.x, element.y,AssetsKeys.IMAGES,'black', {label:"platform"}).setStatic(true));
        })

        return platformArr;
    }

    update() {
        this.player.stateMachine.step();
        console.log(this.player.stateMachine.state)
    }
}