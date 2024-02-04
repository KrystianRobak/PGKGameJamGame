import backgroundImage from '../../assets/images/mainmenuBackground.png'
import startImage from '../../assets/images/start.png'
import creditsIamge from '../../assets/images/credits.png'

export default class MainMenuScene extends Phaser.Scene {
    constructor() {
        super("Menu");
    }

    preload() {
        this.load.image('background', backgroundImage);
        this.load.image('start', startImage);
        this.load.image('edit', creditsIamge);
    }

    init() {
 
    }

    create() {
        const { width, height } = this.scale

    this.background = this.add.image(-100, 0, 'background').setOrigin(0);
	

	const playButton = this.add.image(width * 0.5, height * 0.6, 'start')
		.setDisplaySize(300,100);
	

	// Settings button
	const settingsButton = this.add.image(playButton.x, playButton.y + playButton.displayHeight + 10, 'edit')
		.setDisplaySize(300, 100);


	// Credits button
	const creditsButton = this.add.image(settingsButton.x, settingsButton.y + settingsButton.displayHeight + 10, 'button')
		.setDisplaySize(300,100);


        playButton.setInteractive({ useHandCursor: true }).on('pointerdown', () => this.scene.start('game') );
        
        settingsButton.setInteractive({ useHandCursor: true }).on('pointerdown', () => console.log("Play2") );
    
        creditsButton.setInteractive({ useHandCursor: true }).on('pointerdown', () => console.log("Play3") );


    }

    
    update() {
    }
}