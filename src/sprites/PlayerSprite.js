// @ts-nocheck
import Phaser from '../../lib/phaser';
import AssetsKeys from '../helpers/AssetsKeys';
import CollisionCategories from '../helpers/CollisionCategories';

const maxSpeedValue = 4;
const minSpeedValue = -4;

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

export default class PlayerSprite extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y) {
        super(scene.matter.world, x, y, AssetsKeys.TEXTURES, "Player_Idle1");

        this.setFriction(0, 0);
        this.setBounce(0);

        // Create the hook
        this.hook = null;

        scene.matter.world.scene.add.existing(this);

        this.setCollisionCategory(CollisionCategories.PLAYER);
        this.setCollidesWith(
            CollisionCategories.DEFAULT |
            CollisionCategories.PLATFORM
        );

        scene.events.on('hookcollision', this.handleHookCollision, this);
        this.ShootHook = this.ShootHook.bind(this);
    }

    handleHookCollision(player, hook) {

    }

    ReleaseHook() {
        
    }

    ShootHook() {
        this.hook = this.scene.matter.add.rectangle(
            this.body.position.x + (20 * 2) * Math.cos(angle),
            this.body.position.y + (20 * 2) * Math.sin(angle),
            10,
            10
        );
    }

    IncVelocityX(value) {
        this.setVelocityX(clamp(this.body.velocity.x + value, minSpeedValue, maxSpeedValue));
    }

    DecVelocityX(value) {
        if (this.body.velocity.x < 0) {
            this.setVelocityX(clamp(this.body.velocity.x + value, minSpeedValue, 0));
        } else {
            this.setVelocityX(clamp(this.body.velocity.x + value, 0, maxSpeedValue));
        }
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
