// @ts-nocheck
import Phaser from '../../lib/phaser';
import AssetsKeys from '../helpers/AssetsKeys';
import CollisionCategories from '../helpers/CollisionCategories';

export default class Hook extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y, player) {
        super(scene, x, y, AssetsKeys.TEXTURES, "Player_Idle1");
        this.rope = null;
        this.hook = null;
        this.player = player;

        this.setCollidesWith(
            CollisionCategories.DEFAULT |
            CollisionCategories.PLATFORM
        );

        this.setOnCollide((data) => this.HookCollision(data));
    }

    HookCollision(data) {
        const { bodyA } = data;
        console.log("Hit!");

        if (!bodyA.gameObject) {
            return;
        }

        if (bodyA.gameObject.getData('label') === CollisionCategories.PLATFORM || bodyA.gameObject.getData('label') === CollisionCategories.DEFAULT) {
            this.scene.events.emit('hookcollision', this.player, this);
        }
    }
}
