import backgroundImage from '../../assets/images/background.png';
import resumeImage from '../../assets/images/resume.png';
import musicOnIamge from '../../assets/images/musicOn.png';
import musicOffIamge from '../../assets/images/musicOff.png';
import quitImage from '../../assets/images/quit.png';
import shared from '../shared';

export default class PauseScene extends Phaser.Scene {
    constructor() {
        super("Pause");
    }

    preload() {
        this.load.image('background', backgroundImage);
        this.load.image('resume', resumeImage);
        this.load.image('musicOn', musicOnIamge);
        this.load.image('musicOff', musicOffIamge);
        this.load.image('quit', quitImage);
    }

    init() {

    }

    create() {


        const { width, height } = this.scale

        this.background = this.add.image(-100, 0, 'background').setOrigin(0).setScale(1.51);

        const resumeButton = this.add.image(width * 0.5, height * 0.6, 'resume')
            .setDisplaySize(300,100)
    
        const musicButton = this.add.image(resumeButton.x, resumeButton.y + resumeButton.displayHeight + 10, 'musicOn')
            .setDisplaySize(300, 100)
    
        const quitButton = this.add.image(musicButton.x, musicButton.y + musicButton.displayHeight + 10, 'quit')
            .setDisplaySize(300,100)
    
            resumeButton.setInteractive({ useHandCursor: true }).on('pointerdown', () => this.scene.switch('game') );
            
            musicButton.setInteractive({ useHandCursor: true }).on('pointerdown', () => {
                if(shared.mute) {
                    this.sound.resumeAll();
                    shared.mute = false;
                } else {
                    this.sound.pauseAll();
                    shared.mute = true;
                }
        });
        
            quitButton.setInteractive({ useHandCursor: true }).on('pointerdown', () => this.scene.start('Menu') );
    
        const esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)
        esc.on('down', () => {
            this.scene.switch('game')
        })
        
    }

    update() {

    }
}