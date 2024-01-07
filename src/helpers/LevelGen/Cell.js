// @ts-nocheck
import Phaser from '../../../lib/phaser.js';
import AssetsKeys from '../AssetsKeys.js';

export default class Cell extends Phaser.Physics.Matter.Image {
    constructor(world, x, y, frame, textureKey, options) {
        super(world.matter.world, x, y, frame, textureKey, options);

        // Dodanie meta-informacji do obiektu.
        this.setData('type', 'cell');

        // Dodanie elementu do świata gry.
        world.matter.world.scene.add.existing(this);
    }
}

