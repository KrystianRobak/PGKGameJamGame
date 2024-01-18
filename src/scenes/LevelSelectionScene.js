export default class LevelSelectionScene extends Phaser.Scene {
    constructor() {
        super("LevelSelect");
    }

    preload() {

    }

    init() {

    }

    create() {
        


        const playButton = this.add.image(width * 0.5, height * 0.6, 'glass-panel')
		.setDisplaySize(150, 50)
	
	    this.add.text(playButton.x, playButton.y, 'Play')
		.setOrigin(0.5)

        playButton.setInteractive({ useHandCursor: true }).on('pointerdown', () => this.scene.start('LevelSelect') );
    }

    update() {

    }
}