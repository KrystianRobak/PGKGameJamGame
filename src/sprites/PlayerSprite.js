// @ts-nocheck
import Phaser from '../../lib/phaser';
import AssetsKeys from '../helpers/AssetsKeys';
import Hook from './Hook';

import StateMachine from '../states/StateMachine';
import IdleRunningState from '../states/onGroundState';
import JumpingState from '../states/jumpingState';
import onGrapplingHookState from '../states/onHookState';
import FallingState from '../states/fallingState';
import SlidingState from '../states/slidingState';
import EntitySprite from './EntitySprite';

const maxSpeedValue = 8;
const minSpeedValue = -8;

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

export default class PlayerSprite extends EntitySprite {
    constructor(scene, x, y, controller, keys, labelName) {
        super(scene, x, y, labelName);
        console.log(this.hook)

        this.controller = controller;

        this.stateMachine = new StateMachine('idle', {
            idle: new IdleRunningState(),
            jump: new JumpingState(),
            hook: new onGrapplingHookState(),
            falling: new FallingState(),
            sliding: new SlidingState()
        }, [keys, this]);

        this.setFriction(0, 0);
        this.setBounce(0);
    }
}


