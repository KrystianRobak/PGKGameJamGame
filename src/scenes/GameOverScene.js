import startImage from '../../assets/images/start.png'
import deathGradient from '../../assets/images/death_background.png'
import menuImage from '../../assets/images/menu.png'
import deadItho from '../../assets/images/deadItho.png'
import deadIthotext from '../../assets/images/deadIthotext.png'

export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super("GameOver");
    }

    preload() {
        //this.load.audio('backgroundMusic', ['../../assets/music.mp3', '../../assets/music.ogg']);
        this.load.image('deadItho', deadItho);
        this.load.image('deadIthotext', deadIthotext);
        this.load.image('menu', menuImage);
        this.load.image('deathGradient', deathGradient)

    }

    init() {
 
    }

    create() {
        const { width, height } = this.scale
	
        this.background = this.add.image(-100, 0, 'deathGradient').setOrigin(0).setScale(1.51);

        this.ithoDead = this.add.image(width * 0.5, height * 0.2, 'deadItho')

        this.ithoDeadText = this.add.image(width * 0.5, height * 0.4, 'deadIthotext')

	    this.replayButton = this.add.image(width * 0.5, height * 0.6, 'start')
		.setDisplaySize(300,100);
        
	    this.MenuButton = this.add.image(this.replayButton.x, this.replayButton.y + this.replayButton.displayHeight + 10, 'menu')
		.setDisplaySize(300, 100);

        this.replayButton.setInteractive({ useHandCursor: true }).on('pointerdown', () => {
            //this.scene.stop()
            this.scene.start('game')
        } );
        this.MenuButton.setInteractive({ useHandCursor: true }).on('pointerdown', () => {
            this.scene.stop('game');
            this.scene.start('Menu')} );
    }
    
    update() {
    }
}