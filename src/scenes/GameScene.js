import Phaser from 'phaser'
import AssetsKeys from '../helpers/AssetsKeys';
import BallSprite from '../sprites/BallSprite';
import BrickSprite from '../sprites/BrickSprite';
import PlatformSprite from '../sprites/PlatformSprite';

export default class GameScene extends Phaser.Scene
{
    constructor()
    {
        super("game");
    }
    preload()
    {
        this.load.atlas(AssetsKeys.TEXTURES, '/images/spritesheet.png', '/images/spritesheet.json');
    }
    init()
	{
        // Utworzenie odwołania do flag oznaczających wciśnięcie klawiszy strzałek, spacji i klawisza Shift.
		this.cursors = this.input.keyboard.createCursorKeys();
	}
    create()
    {
        // Ustawienie krawędzi dla świata (by kulka odbijała się od ścian, ale nie od podłogi).
        this.matter.world.setBounds(0, 0, this.game.scale.gameSize.width, this.game.scale.gameSize.height + 100);

        // Ustalenie tła.
        this.cameras.main.setBackgroundColor('#0202AA');

        // Utworzenie cegieł.
        let y = 54;
        for (let brickColor of ["red", "yellow", "blue", "green"]) {
            for (let i = 0; i < 2; ++i) {
                for (let x = 0; x < 12; ++x) {
                    new BrickSprite(this.matter.world, x * 67 + 67 / 2, y + 27 / 2, brickColor);
                }
                y += 27;
            }
        }

        // Utworzenie platformy.
        this.platform = new PlatformSprite(
            this.matter.world,
            this.game.scale.gameSize.width / 2,
            23 * 27 + 27 / 2
        );

        // Utworzenie kulki.
        this.ball = new BallSprite(
            this,
            this.game.scale.gameSize.width / 2,
            this.game.scale.gameSize.height / 2
        );

        // Zainicjowanie pozycji kulki.
        this.platform.attachBall(this.ball);
    }
    update()
	{
        // Start ruchu kulki po wciśnięciu spacji.
		if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
			this.platform.launchBall();
		}
        if(Phaser.Input.Keyboard.JustDown(this.cursors.left)) {
            this.platform.startMove(-5)
        }
        if(Phaser.Input.Keyboard.JustDown(this.cursors.right)) {
            this.platform.startMove(5)
        }
        if(Phaser.Input.Keyboard.JustUp(this.cursors.left)) {
            this.platform.stopMove()
        }
        if(Phaser.Input.Keyboard.JustUp(this.cursors.right)) {
            this.platform.stopMove()
        }

        // Aktualizacja logiki platformy (ruch platformy po wciśnięciu).
		this.platform.update(this.cursors);
	}
}
