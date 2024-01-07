// @ts-nocheck
import Phaser from '../../lib/phaser';
import AssetsKeys from '../helpers/AssetsKeys';
import CollisionCategories from '../helpers/CollisionCategories';

export default class PlayerSprite extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y) {
        super(scene.matter.world, x, y, AssetsKeys.TEXTURES, "Player_Idle1");

        this.setFriction(0, 0);
        this.setBounce(1);

        scene.matter.world.scene.add.existing(this);

        this.setCollisionCategory(CollisionCategories.PLAYER);
        this.setCollidesWith(
            CollisionCategories.DEFAULT |
            CollisionCategories.PLATFORM
        );
    }

    createAnimations() {
        this.scene.anims.create({
            key: 'idle',
            frames: this.scene.anims.generateFrameNames(AssetsKeys.TEXTURES, {
                prefix: 'Player_Idle',
                start: 1,
                end: 6,
                zeroPad: 1,
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.scene.anims.create({
            key: 'run',
            frames: this.scene.anims.generateFrameNames(AssetsKeys.TEXTURES, {
                prefix: 'Player_Run',
                start: 1,
                end: 8,
                zeroPad: 1,
            }),
            frameRate: 10,
            repeat: 0,
        });
        
    }

    startAnimation() {
        this.anims.play('idle', true);
    }
}