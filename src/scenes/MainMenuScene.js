export default class MainMenuScene extends Phaser.Scene {
    constructor() {
        super("Menu");
    }

    preload() {

    }

    init() {
        //this.scene.manager.start
    }

    create() {
        const { width, height } = this.scale

	// Play button
	const playButton = this.add.image(width * 0.5, height * 0.6, 'glass-panel')
		.setDisplaySize(300,100)
	
	this.add.text(playButton.x, playButton.y, 'Play')
		.setOrigin(0.5)

	// Settings button
	const settingsButton = this.add.image(playButton.x, playButton.y + playButton.displayHeight + 10, 'glass-panel')
		.setDisplaySize(300, 100)

	this.add.text(settingsButton.x, settingsButton.y, 'Settings')
		.setOrigin(0.5)

	// Credits button
	const creditsButton = this.add.image(settingsButton.x, settingsButton.y + settingsButton.displayHeight + 10, 'glass-panel')
		.setDisplaySize(300,100)

	this.add.text(creditsButton.x, creditsButton.y, 'Credits')
		.setOrigin(0.5)

        playButton.setInteractive({ useHandCursor: true }).on('pointerdown', () => this.scene.start('LevelSelect') );
        
        settingsButton.setInteractive({ useHandCursor: true }).on('pointerdown', () => console.log("Play2") );
    
        creditsButton.setInteractive({ useHandCursor: true }).on('pointerdown', () => console.log("Play3") );


    }

    
    update() {

    }
}