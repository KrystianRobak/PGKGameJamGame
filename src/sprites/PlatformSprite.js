import Phaser from 'phaser'
import AssetsKeys from '../helpers/AssetsKeys';
import CollisionCategories from '../helpers/CollisionCategories';
import Events from '../helpers/Events';

/**
 * Alternatywnie można użyć klasy `Phaser.Physics.Matter.Sprite`, która posiada moduł animacji.
 */
export default class PlatformSprite extends Phaser.Physics.Matter.Image
{
    constructor(world, x, y)
    {
         // Utworzenie statycznego elementu w świecie gry.
        super(world, x, y, AssetsKeys.TEXTURES, 'platform_s', {
            isStatic: true
        });

        // Dodanie meta-informacji do obiektu.
        this.setData('type', 'platform');

        // Dodanie maski kolizji
        this.setCollisionCategory(CollisionCategories.PLATFORM);
        this.setCollidesWith(
            CollisionCategories.DEFAULT
            | CollisionCategories.BALL
        );

        // Dodanie elementu do świata gry.
        world.scene.add.existing(this);

        this.isMoving = false;
        this.moveSpeed = 5;
    }

    /**
     * Funkcja obsługująca ustawienie kulki na pozycji.
     */
    attachBall(ball)
	{
		this.ball = ball;
		this.ball.x = this.x;
		this.ball.y = this.y - (this.height * 0.5) - (ball.height * 0.5);
		this.ball.setVelocity(0, 0);
	}

    /**
     * Funkcja obsługująca start kulki na pozycji.
     */
    launchBall()
    {
        if (! this.ball) {
			return
		}
		const { width, height } = this.scene.scale;
		const x = width * 0.5;
		const y = height * 0.5;
		const vx = x - this.ball.x;
		const vy = y - this.ball.y;
		const vec = new Phaser.Math.Vector2(vx, vy)
			.normalize()
			.scale(8);
		this.ball.setVelocity(vec.x, vec.y);
		this.ball = null;
    }

    startMove(moveSpeed_)
    {
        this.isMoving = true;
        this.moveSpeed = moveSpeed_;
    }

    stopMove()
    {
        this.isMoving = false;
    }

    update(cursors)
	{
		if (this.ball) {
            this.ball.x = this.x
        }
        if(this.isMoving)
        {
            this.x += this.moveSpeed;
        }
	}
}
