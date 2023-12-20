// @ts-nocheck
import Phaser from 'phaser'
import AssetsKeys from '../helpers/AssetsKeys';
import CollisionCategories from '../helpers/CollisionCategories';
import Events from '../helpers/Events';

/**
 * Alternatywnie można użyć klasy `Phaser.Physics.Matter.Sprite`, która posiada moduł animacji.
 */
export default class BallSprite extends Phaser.Physics.Matter.Image
{
    constructor(scene, x, y)
    {
        // Utworzenie obiektu gry oraz zmiana kolizji na okrąg.
        super(scene.matter.world, x, y, AssetsKeys.TEXTURES, 'ball', {
            circleRadius: 7
        });
        
        // Ustawienie parametrów dla ruchu kulki.
		this.setFriction(0, 0)
		this.setBounce(1)
        // @ts-ignore
        scene.matter.body.setInertia(this.body, Infinity);

        // Dodanie elementu do świata gry.
        scene.matter.world.scene.add.existing(this);

        // Dodanie maski kolizji
        this.setCollisionCategory(CollisionCategories.BALL);
        this.setCollidesWith(
            CollisionCategories.DEFAULT
            | CollisionCategories.PLATFORM
        );

        // Obsługa zdarzenia kolizji.
        this.setOnCollide(this.handleCollide)
    }

    /**
     * Funkcja obsługująca zdarzenie kolizji.
     */
    handleCollide(data)
    {
        // W obiekcie data znajdują się dane opisowe kolizji. W tym referencja do "ciała" obiektu fizycznego w grze...
        const { bodyA } = data;
        
        // ... prze, które można się odwołać do samego obiektu gry.
		if (! bodyA.gameObject) {
			return
		}
        // Sprawdzenie czy uderzyliśmy w cegłę.
        if (bodyA.gameObject.getData('type') === 'brick') {
            bodyA.gameObject.destroy(true);
            this.gameObject.scene.events.emit(Events.BRICK_HIT);
            /**
             * Możesz później odwołać się do tego zdarzenia przez:
             * this.scene.events.on(Events.BRICK_HIT, () => {});
             * gdzie this to odniesienie do obiektu gry sceny.
             */
		} else if (bodyA.gameObject.getData('type') === 'platform') {
            // Dodanie małego odchylenia jeżeli kulka leci "za prosto".
            if (Math.abs(this.gameObject.body.velocity.x) < 0.1) {
                this.gameObject.setVelocityX(
                    this.gameObject.body.velocity.x
                        + Phaser.Math.FloatBetween(-0.1, 0.1)
                );
            }
        }
    }
}
