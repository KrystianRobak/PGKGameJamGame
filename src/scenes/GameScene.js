import Phaser from '../../lib/phaser';
import AssetsKeys from '../helpers/AssetsKeys';
import PlayerSprite from '../sprites/PlayerSprite';
import ProceduralGenerator from '../helpers/LevelGen/ProceduralGenerator';
import spritesheet from '../../assets/images/spritesheet.png';
import spritesheetjson from '../../assets/images/spritesheet.json';
import imagesheet from '../../assets/images/images.png';
import imagesheetjson from '../../assets/images/imagesheet.json';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super("game");
    }

    preload() {
        this.load.atlas(AssetsKeys.IMAGES, imagesheet,imagesheetjson);
        this.load.atlas(AssetsKeys.TEXTURES, spritesheet, spritesheetjson);
    }

    init() {
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    create() {
        this.matter.world.setBounds(0, 0, this.game.scale.gameSize.width, this.game.scale.gameSize.height);
        this.cameras.main.setBackgroundColor('#00FFFF');

        this.worldGrid = ProceduralGenerator.createWorldGrid(this);
        this.worldGrid = ProceduralGenerator.generatePerlinNoise(this.worldGrid, this)

        // const levelWidth = 28000; // Set your level width
        // const noiseLength = 800; // Set the length of the Perlin noise array
        // const frequency = 0.05; // Adjust the frequency of the Perlin noise
        // const amplitude = 250; // Adjust the amplitude of the Perlin noise


        // this.worldGrid.forEach(element => {
        //     element.forEach(element2 => {
        //         cell.setTexture(AssetsKeys.IMAGES, 'black');
        //     });
        // });

        this.player = new PlayerSprite(
            this,
            this.game.scale.gameSize.width / 2,
            this.game.scale.gameSize.height / 2
        );

        this.player.createAnimations();
        this.player.startAnimation();
    }

    update() {
        if (this.cursors.space.isDown)
        {
            this.player.setVelocityY(-3);
        }
        if (this.cursors.left.isDown)
        {
            this.player.setVelocityX(-1.6);
            this.player.setFlipX(true);
            this.player.anims.play('run', true);
        }
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(1.6);
            this.player.setFlipX(false);
            this.player.anims.play('run', true);
        }
        else
        {
            this.player.setVelocityX(0);
            this.player.anims.play('idle', true);
        }
    }
}