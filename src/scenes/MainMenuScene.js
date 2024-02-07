import backgroundImage from '../../assets/images/background.png';
import startImage from '../../assets/images/start.png';
import creditsIamge from '../../assets/images/credits.png';
import musicOnIamge from '../../assets/images/musicOn.png';
import musicOffIamge from '../../assets/images/musicOff.png';
import title from '../../assets/images/title.png';
import tutorialBImage from '../../assets/images/tutorialB.png';
import shared from '../shared';


export default class MainMenuScene extends Phaser.Scene {
    constructor() {
        super("Menu");
    }

    preload() {
        this.load.audio('music', './music.mp3');
        this.load.image('title', title);
        this.load.image('background', backgroundImage);
        this.load.image('start', startImage);
        this.load.image('credit', creditsIamge);
        this.load.image('musicOn', musicOnIamge);
        this.load.image('musicOff', musicOffIamge);
        this.load.image('tutorialB', tutorialBImage);
    }

    init() {
 
    }

    create() {
        const { width, height } = this.scale

        this.music = this.sound.add('music')
        var musicConfig = {
            mute: false,
            volume: 0.5,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }
        this.music.play(musicConfig)

        this.background = this.add.image(-100, 0, 'background').setOrigin(0).setScale(1.51);
        
        this.title = this.add.image(width * 0.5, height * 0.2, 'title');

	    this.playButton = this.add.image(width * 0.5, height * 0.6, 'start')
		.setDisplaySize(300,100);
	

	    this.creditsButton = this.add.image(this.playButton.x, this.playButton.y + this.playButton.displayHeight + 10, 'credit')
		.setDisplaySize(300, 100);

        this.tutorialButton = this.add.image(this.creditsButton.x, this.creditsButton.y + this.creditsButton.displayHeight + 10, 'tutorialB')
        .setDisplaySize(300, 100)

        this.musicButton = this.add.image(this.tutorialButton.x, this.tutorialButton.y + this.tutorialButton.displayHeight + 10, 'musicOn')
        .setDisplaySize(300, 100)


        this.musicButton.setInteractive({ useHandCursor: true }).on('pointerdown',() => {
            if(shared.mute) {
                this.sound.resumeAll();
                shared.mute = false;
            } else {
                this.sound.pauseAll();
                shared.mute = true;
            }
        });

        this.tutorialButton.setInteractive({ useHandCursor: true }).on('pointerdown', () => this.scene.start('tutorial') );

        this.playButton.setInteractive({ useHandCursor: true }).on('pointerdown', () => this.scene.start('game') );

        this.creditsButton.setInteractive({ useHandCursor: true }).on('pointerdown', () => this.scene.start('credit') );
    }
    
    update() {
    }
}