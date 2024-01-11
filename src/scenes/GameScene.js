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
        
        // Set up click event
        this.chain = [];
        this.curr = null;

        this.input.on('pointerdown',() => {
            // Calculate the angle between the player and the cursor
            var angle = Phaser.Math.Angle.Between(this.player.x, this.player.y, this.input.x, this.input.y);
            // Calculate the distance from the player to the cursor
            // Calculate the starting position of the rectangle
            var startX = this.player.x + (200) * Math.cos(angle);
            var startY = this.player.y + (200) * Math.sin(angle);
            // Add a rectangle from the player to the cursor
            




            



            const group = this.matter.world.nextGroup(true);
            
            const hook = this.matter.add.stack(startX, startY, 15, 1, 0, 30, (x, y) => Phaser.Physics.Matter.Matter.Bodies.rectangle(x - 20, y, 53, 20, {
                collisionFilter: { group: group },
                chamfer: 5,
                density: 0.005,
                frictionAir: 0.05
            }));

            this.matter.add.chain(hook, 0.3, 0, -0.3, 0, {
                stiffness: 1,
                length: 0,
                render: {
                    visible: true
                }
            });


            // this.rectangle = this.add.rectangle(
            //     startX,
            //     startY,
            //     400,
            //     20,
            //     0xff0000 // Red color
            // );
            // for(var i = 0 ; i < configs.distance/30; i++) {
            //     this.curr = this.matter.add.rectangle(
            //         startX,
            //         startY,
            //         10,
            //         5,
            //         {
            //             collisionFilter: { group: group },
            //             chamfer: 5,
            //             density: 0.005,
            //             frictionAir: 0.05,
            //             render: {
            //                 fillStyle: '#ff0000', // Set the fill color
            //             }
            //         }// Red color
            //     );
            //     //this.curr.setAngle(Phaser.Math.RadToDeg(angle));
            //     console.log("Chain element:", this.chain[i-1]);
            //     console.log("Current element:", this.curr);
            //     if(i > 0 && this.chain[i-1]){
            //         this.matter.add.constraint(this.chain[i-1], this.curr);
            //     }
                
            //     this.chain[i] = this.curr;
            //     startX = this.player.x + (200 + i*30) * Math.cos(angle);
            //     startY = this.player.y + (200 + i*30) * Math.sin(angle);
            // }
            
        },this);

        this.input.on('pointerup', function () {
            // Calculate the angle between the player and the cursor
            for(var i = 0 ; i < this.chain.length; i++) {
               //this.chain[i].destroy();
            }
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