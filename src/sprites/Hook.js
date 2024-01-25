// @ts-nocheck
import Phaser from '../../lib/phaser';
import AssetsKeys from '../helpers/AssetsKeys';
import configs from '../helpers/configs';

export default class Hook{
    constructor(scene, player) {

        this.hook = [];
        this.hitHook = false;
        this.rayCast = null;
        this.rayCastChain = [];
        this.constrinatChain = [];
        this.shootingHook = false;
        this.scene = scene;
        this.player = player;

    }

    CreateHookBinds() {
        this.scene.input.on('pointerdown', (pointer) => {
            this.ShootHook(pointer);
        });
 
        this.scene.input.on('pointerup', () => {
            this.DeleteHook();
        }, this);
    }

    ShootHook(pointer) {
        if (!this.shootingHook) {
            this.shootingHook = true;
            const pointerX = pointer.worldX;
            const pointerY = pointer.worldY;

            const playerX = this.player.x;
            const playerY = this.player.y;

            const shootLaserRecursive = (index) => {
                if (index < 15 && this.shootingHook) {
                    this.rayCast = this.shootLaser(playerX, playerY, pointerX, pointerY, index);
                    if (index === 0) {
                        this.constrinatChain.push(this.scene.matter.add.constraint(this.player, this.rayCast));
                    } else {
                         this.constrinatChain.push(this.scene.matter.add.constraint(this.rayCast, this.rayCastChain[index - 1]));
                    }
                    this.rayCastChain.push(this.rayCast);

                    this.rayCast.setOnCollideWith(this.scene.platforms, () => {
                        if (!this.player.shootingHook) {
                            this.shootingHook = false;
                            this.rayCast.setStatic(true);
                            this.player.stateMachine.transition('hook');
                            console.log('hi');
                        }
                    });

                    setTimeout(() => {
                        if (this.rayCast.body) {
                            this.rayCast.setCollisionCategory(null);
                        }
                        shootLaserRecursive(index + 1);
                    }, 1);
                }
            };

            shootLaserRecursive(0);
        }
    }

    DeleteHook() {
        this.shootingHook = false;
        this.player.stateMachine.transition('falling')
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
    }

    shootLaser(startX, startY, endX, endY, i){

        var angle = Phaser.Math.Angle.Between(startX, startY, endX, endY);

        var startX_ = startX+ (i*30 + configs.distance/5)  * Math.cos(angle);
        var startY_ = startY+ (i*30 + configs.distance/5)  * Math.sin(angle);
    
        // Create a laser beam as a matter sprite
        var laser = this.scene.matter.add.image(startX_, startY_, AssetsKeys.IMAGES,'rope', {label:"laser"}).setSensor(true);
        // Set the rotation of the laser to match the angle
        laser.setRotation(angle);
    
        return laser;
    }
}
