// @ts-nocheck
import Phaser from '../../lib/phaser';
import AssetsKeys from '../helpers/AssetsKeys';
import Hook from './Hook';

const maxSpeedValue = 8;
const minSpeedValue = -8;

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

export default class EntitySprite extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y, labelName) {
        super(scene.matter.world, x, y, AssetsKeys.PLAYER, "Player_Idle1", {label:labelName});

        this.hook = new Hook(this.scene, this)
        this.jumpFlip = true;

        this.setFriction(0, 0);
        this.setBounce(0);
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

    IncVelocityY(value) {
        this.setVelocityY(this.body.velocity.y + value);
    }

    setPlayerTexture(key, frame) {
        this.setTexture(key, frame);
    }

    createAnimations() {
        this.scene.anims.create({
            key: 'idle',
            frames: this.scene.anims.generateFrameNames(AssetsKeys.PLAYER, {
                prefix: 'Player_Idle',
                start: 1,
                end: 9,
                zeroPad: 1,
                suffix: '',
            }),
            frameRate: 10,
            repeat: -1,
        });
    
        this.scene.anims.create({
            key: 'run',
            frames: this.scene.anims.generateFrameNames(AssetsKeys.PLAYER, {
                prefix: 'Player_Run',
                start: 1,
                end: 4,
                zeroPad: 1,
                suffix: '',
            }),
            frameRate: 10,
            repeat: 0,
        });
    
        this.scene.anims.create({
            key: 'jumping',
            frames: this.scene.anims.generateFrameNames(AssetsKeys.PLAYER, {
                prefix: 'Player_Jump',
                start: 1,
                end: 3,
                zeroPad: 1,
                suffix: '',
            }),
            frameRate: 10,
            repeat: 0,
        });
    
        this.scene.anims.create({
            key: 'sliding',
            frames: this.scene.anims.generateFrameNames(AssetsKeys.PLAYER, {
                prefix: 'Player_Slide',
                start: 1,
                end: 4,
                zeroPad: 1,
                suffix: '',
            }),
            frameRate: 10,
            repeat: 0,
        });
    }
}


