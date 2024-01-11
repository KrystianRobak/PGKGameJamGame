import Phaser from '../../lib/phaser';
import AssetsKeys from '../helpers/AssetsKeys';
import PlayerSprite from '../sprites/PlayerSprite';
import ProceduralGenerator from '../helpers/LevelGen/ProceduralGenerator';
import spritesheet from '../../assets/images/spritesheet.png';
import spritesheetjson from '../../assets/images/spritesheet.json';
import imagesheet from '../../assets/images/images.png';
import imagesheetjson from '../../assets/images/imagesheet.json';
import CollisionCategories from '../helpers/CollisionCategories';
import configs from '../helpers/configs';


export default class GameScene extends Phaser.Scene {
    constructor() {
        super("game");
    }

    preload() {
        this.load.atlas(AssetsKeys.IMAGES, imagesheet,imagesheetjson);
        this.load.atlas(AssetsKeys.TEXTURES, spritesheet, spritesheetjson);
        this.load.image('ground', 'https://labs.phaser.io/src/games/firstgame/assets/platform.png');
    }

    init() {
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    create() {
        this.matter.world.setBounds(0, 0, this.game.scale.gameSize.width, this.game.scale.gameSize.height);
        this.cameras.main.setBackgroundColor('#000000');

        // Add platforms
        const platforms = this.createPlatforms();

        this.player = new PlayerSprite(
            this,
            0,
            this.game.scale.gameSize.height / 2
        );

        this.player.createAnimations();
        this.player.startAnimation();
        
        console.log(Phaser.Physics.Matter.MatterPhysics.query)

        // Set up click event
        this.rayCast = this.matter.add.rectangle(
            startX,
            startY,
            configs.distance,
            1,
            {
                angle:angle,
                render: {
                    visible: true,
                    color:0xff0000
                },
                isStatic: true
            } // Red color
        );
        this.curr = null;

        this.input.on('pointerdown',() => {
            // Calculate the angle between the player and the cursor
            var angle = Phaser.Math.Angle.Between(this.player.x, this.player.y, this.input.x, this.input.y);
            // Calculate the distance from the player to the cursor
            // Calculate the starting position of the rectangle
            var startX = this.player.x + configs.distance/2 * Math.cos(angle);
            var startY = this.player.y + configs.distance/2 * Math.sin(angle);
            // Add a rectangle from the player to the cursor
            console.log(angle);
            this.rectangle
            
        },this);

        this.input.on('pointerup', function () {

            this.constraintChain.forEach(element => {
                this.matter.world.removeConstraint(element);
            });
            for(var i = 0 ; i < this.chain.length; i++) {
               this.matter.world.remove(this.chain[i]);
            }
            this.chain = [];
            this.constraintChain = [];
            console.log(this.chain)
            console.log(this.constraintChain)
        }, this);
    }

    createPlatforms() {
        // Add platforms to the scene
        const platform1 = this.matter.add.image(200, 310, 'ground').setStatic(true);
        const platform2 = this.matter.add.image(400, 100, 'ground').setStatic(true);

        platform1.label = CollisionCategories.PLATFORM;
        platform2.label = CollisionCategories.PLATFORM;

        return [platform1, platform2];
    }

    update() {
        if (this.cursors.up.isDown)
        {
            this.player.setVelocityY(-2);
        }
        if (this.cursors.left.isDown)
        {
            this.player.IncVelocityX(-0.1);
            this.player.setFlipX(true);
            this.player.anims.play('run', true);
        }
        else if (this.cursors.right.isDown)
        {
            this.player.IncVelocityX(0.1);
            this.player.setFlipX(false);
            this.player.anims.play('run', true);
        }
        else
        {
            if(this.player.body.velocity.x < 0)
                this.player.DecVelocityX(0.05);
            else
                this.player.DecVelocityX(-0.05);
            this.player.anims.play('idle', true);
        }
    }

}