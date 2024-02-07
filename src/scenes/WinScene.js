import happyGradient from '../../assets/images/happy_background.png'
import menuImage from '../../assets/images/menu.png'
import happyItho from '../../assets/images/happyItho.png'
import happyIthotext from '../../assets/images/happyIthotext.png'

export default class WinScene extends Phaser.Scene {
    constructor() {
        super("Win");
    }

    preload() {
        //this.load.audio('backgroundMusic', ['../../assets/music.mp3', '../../assets/music.ogg']);
        this.load.image('happyItho', happyItho);
        this.load.image('happyIthotext', happyIthotext);
        this.load.image('menu', menuImage);
        this.load.image('happyGradient', happyGradient)

    }

    init() {
 
    }

    create() {
        const { width, height } = this.scale
	
        this.background = this.add.image(-100, 0, 'happyGradient').setOrigin(0).setScale(1.51);

        this.ithoDead = this.add.image(width * 0.5, height * 0.2, 'happyItho')

        this.ithoDeadText = this.add.image(width * 0.5, height * 0.4, 'happyIthotext')

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