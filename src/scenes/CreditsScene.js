import backgroundImage from '../../assets/images/background.png'
import menuImage from '../../assets/images/menu.png'
import tutorialH from '../../assets/images/tutorial.png'
import KR from '../../assets/images/KR.png'
import KP from '../../assets/images/KP.png'
import link from '../../assets/images/link.png'

export default class CreditsScene extends Phaser.Scene {
    constructor() {
        super("credit");
    }

    preload() {
        this.load.image('KR', KR);
        this.load.image('KP', KP);
        this.load.image('menu', menuImage);
        this.load.image('background', backgroundImage);
        this.load.image('link', link);
        this.load.image('menu', menuImage);

    }

    init() {
 
    }

    create() {
        const { width, height } = this.scale

        this.background = this.add.image(0, 0, 'background').setOrigin(0).setScale(1.51);

        this.tutorial = this.add.image(width * 0.3, height * 0.05, 'KR').setOrigin(0);
        this.tutorial = this.add.image(width * 0.3, height * 0.2, 'KP').setOrigin(0);
        this.tutorial = this.add.image(width * 0.3, height * 0.4, 'link').setOrigin(0);
	
	    this.playButton = this.add.image(width * 0.5, height * 0.6, 'menu')
		.setDisplaySize(300,100);
	

        this.playButton.setInteractive({ useHandCursor: true }).on('pointerdown', () => this.scene.start('Menu') );
    }

    update() {
    }
}