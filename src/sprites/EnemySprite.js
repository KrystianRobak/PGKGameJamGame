// @ts-nocheck
import Phaser from '../../lib/phaser';
import AssetsKeys from '../helpers/AssetsKeys';
import Hook from './Hook';

import EntitySprite from './EntitySprite';

const maxSpeedValue = 8;
const minSpeedValue = -8;

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

export default class EnemySprite extends EntitySprite {
    constructor(scene, x, y, controller, recording, labelName) {
        super(scene, x, y, labelName);
        this.hook = new Hook(this.scene, this)
        this.jumpFlip = true;

        this.controller = controller;

        this.hooked = false;
        
        this.recording = recording;

        this.prevNums = this.recording[0];
        this.currNums = this.recording[1];
        
        this.recordingNum = 1;

        this.setFriction(0, 0);
        this.setBounce(0);
    }
}


