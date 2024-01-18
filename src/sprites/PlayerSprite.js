// @ts-nocheck
import Phaser from '../../lib/phaser';
import AssetsKeys from '../helpers/AssetsKeys';
import CollisionCategories from '../helpers/CollisionCategories';
import configs from '../helpers/configs';

import StateMachine from '../states/StateMachine';
import IdleRunningState from '../states/onGroundState';
import JumpingState from '../states/jumpingState';
import onGrapplingHookState from '../states/onHookState';

const maxSpeedValue = 8;
const minSpeedValue = -8;

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

export default class PlayerSprite extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y) {
        super(scene.matter.world, x, y, AssetsKeys.TEXTURES, "Player_Idle1", {
            iretia:Infinity,
            mass: 20

        });

        this.stateMachine = new StateMachine('idle', {
            idle: new IdleRunningState(),
            jump: new JumpingState(),
            hook: new onGrapplingHookState()
        }, [this.scene, this]);

        this.setFriction(0, 0);
        this.setBounce(0);

        this.touchingGround = false;
        this.hook = [];
        this.hitHook = false;
        this.rayCast = null;
        this.rayCastChain = [];
        this.constrinatChain = [];
        this.shootingHook = false;

        

        scene.matter.world.scene.add.existing(this);

        this.setCollisionCategory(CollisionCategories.PLAYER);
        this.setCollidesWith(
            CollisionCategories.DEFAULT |
            CollisionCategories.PLATFORM
        );

        this.shootLaser = (startX, startY, endX, endY, i) =>  {

            var angle = Phaser.Math.Angle.Between(startX, startY, endX, endY);
    
            var startX_ = startX+ (i*30 + configs.distance/5)  * Math.cos(angle);
            var startY_ = startY+ (i*30 + configs.distance/5)  * Math.sin(angle);
        
            // Create a laser beam as a matter sprite
            var laser = this.scene.matter.add.image(startX_, startY_, AssetsKeys.IMAGES,'rope', {label:"laser"}).setSensor(true);
            // Set the rotation of the laser to match the angle
            laser.setRotation(angle);
        
            return laser;
        }

        this.CreateHookBinds();
    }


    CreateHookBinds() {
        this.scene.events.on('hookHit',() => {
            this.shootingHook = false;
            this.rayCast.setStatic(true);
            this.stateMachine.transition('hook')
            console.log("hi!")
        }, this)

        this.scene.input.on('pointerdown', (pointer) => {
            if (!this.shootingHook) {
                this.shootingHook = true;
                const pointerX = pointer.worldX;
                const pointerY = pointer.worldY;
 
                const playerX = this.x;
                const playerY = this.y;
 
                const shootLaserRecursive = (index) => {
                    if (index < 15 && this.shootingHook) {
                        this.rayCast = this.shootLaser(playerX, playerY, pointerX, pointerY, index);
                        if (index === 0) {
                            this.constrinatChain.push(this.scene.matter.add.constraint(this, this.rayCast));
                        } else {
                             this.rayCastChain[index-1].setCollisionCategory(null);
                             this.constrinatChain.push(this.scene.matter.add.constraint(this.rayCast, this.rayCastChain[index - 1]));
                        }
                        this.rayCastChain.push(this.rayCast);
 
                        setTimeout(() => {
                            shootLaserRecursive(index + 1);
                        }, 1);
                    }
                };
 
                shootLaserRecursive(0);
            }
        });
 
        this.scene.input.on('pointerup', () => {
            this.shootingHook = false;
            this.stateMachine.transition('jump',2)
            this.rayCastChain.forEach(elem => {
                elem.destroy();
            });
            this.rayCastChain = [];
            this.hook.forEach(elem => {
                elem.destroy();
            });
            this.constrinatChain.forEach(elem => {
                this.scene.matter.world.removeConstraint(elem);
            });
            this.constrinatChain = [];
        }, this);
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


