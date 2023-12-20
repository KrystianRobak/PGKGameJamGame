import Phaser from 'phaser'
import AssetsKeys from '../helpers/AssetsKeys';

/**
 * Alternatywnie można użyć klasy `Phaser.Physics.Matter.Sprite`, która posiada moduł animacji.
 */
export default class BrickSprite extends Phaser.Physics.Matter.Image
{
    constructor(world, x, y, color)
    {
        // Utworzenie statycznego elementu w świecie gry.
        super(world, x, y, AssetsKeys.TEXTURES, 'brick_' + color, {
            isStatic: true
        });

        // Dodanie meta-informacji do obiektu.
        this.setData('type', 'brick');

        // Dodanie elementu do świata gry.
        world.scene.add.existing(this);
    }
}
