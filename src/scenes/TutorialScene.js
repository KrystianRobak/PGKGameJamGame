import backgroundImage from '../../assets/images/background.png'
import menuImage from '../../assets/images/menu.png'
import tutorialH from '../../assets/images/tutorial.png'

export default class MainMenuScene extends Phaser.Scene {
    constructor() {
        super("tutorial");
    }

    preload() {
        this.load.image('background', backgroundImage);
        this.load.image('tutorialH', tutorialH);
        this.load.image('menu', menuImage);

    }

    init() {
 
    }

    create() {
        const { width, height } = this.scale

        this.background = this.add.image(0, 0, 'background').setOrigin(0).setScale(1.51);

        this.tutorial = this.add.image(0,0, 'tutorialH').setOrigin(0);
	
	    this.playButton = this.add.image(width * 0.5, height * 0.6, 'menu')
		.setDisplaySize(300,100);
	

        this.playButton.setInteractive({ useHandCursor: true }).on('pointerdown', () => this.scene.start('Menu') );
    }

    update() {
    }
}