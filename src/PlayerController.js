import AssetsKeys from "./helpers/AssetsKeys";
import PlayerSprite from "./sprites/PlayerSprite";

export default class PlayerController {
    constructor(scene) {
        this.scene = scene;

        this.keys = {
            keyA: this.scene.input.keyboard.addKey('A'),
            keyW: this.scene.input.keyboard.addKey('SPACE'),
            keyD: this.scene.input.keyboard.addKey('D')
        }

        this.playerSprite = new PlayerSprite(this.scene,0,this.scene.game.scale.gameSize.height *0.2, this, this.keys, 'player');

        scene.add.existing(this.playerSprite);

        this.blocked = {
            left: false,
            right: false,
            bottom: false
        };
        const sx = this.playerSprite.width / 2;
        const sy = this.playerSprite.height / 2;

        const playerBody = Phaser.Physics.Matter.Matter.Bodies.rectangle(sx, sy, this.playerSprite.width/1.8, this.playerSprite.height-20);
        playerBody.label = 'player';
        this.sensors = {
            bottom: Phaser.Physics.Matter.Matter.Bodies.rectangle(sx, this.playerSprite.height, sx, 10, { isSensor: true , label: 'bottom'}),
            left: Phaser.Physics.Matter.Matter.Bodies.rectangle(sx - this.playerSprite.width * 0.30, sy, 5, this.playerSprite.height*0.80, { isSensor: true, label: 'left' }),
            right: Phaser.Physics.Matter.Matter.Bodies.rectangle(sx + this.playerSprite.width * 0.30, sy, 5, this.playerSprite.height*0.80, { isSensor: true, label: 'right' })
        };

        const compoundBody = Phaser.Physics.Matter.Matter.Body.create({
            parts: [
                playerBody, this.sensors.bottom, this.sensors.left, this.sensors.right
            ],
            friction: 0.001
        });

        this.playerSprite
            .setExistingBody(compoundBody)
            .setFixedRotation();

        this.playerSprite.setPosition(230,1900).setScale(0.8).setFixedRotation();;
        this.createColliders();
    }

    createColliders() {
        this.scene.matter.world.on('collisionactive', function (event) {
            for (let i = 0; i < event.pairs.length; i++)
            {
                const bodyA = event.pairs[i].bodyA;
                const bodyB = event.pairs[i].bodyB;

                if(bodyA.label === 'bottom' && bodyB.label === 'platform' || bodyA.label === 'platform' && bodyB.label === 'bottom') {
                    if(this.blocked.right || this.blocked.left)
                        this.playerSprite.stateMachine.transition('sliding')
                    else
                        this.playerSprite.stateMachine.transition('idle')
                }
            }
        }, this);

        this.scene.matter.world.on('collisionstart', function (event) {
            for (let i = 0; i < event.pairs.length; i++)
            {
                const bodyA = event.pairs[i].bodyA;
                const bodyB = event.pairs[i].bodyB;
                if(bodyA.label === 'right' && bodyB.label === 'platform' || bodyA.label === 'platform' && bodyB.label === 'right') {
                    if(this.playerSprite.stateMachine.state != 'hook'){
                        this.blocked.right = true;
                        this.playerSprite.stateMachine.transition('sliding')
                    }
                }
                else if(bodyA.label === 'left' && bodyB.label === 'platform' || bodyA.label === 'platform' && bodyB.label === 'left') {
                    if(this.playerSprite.stateMachine.state != 'hook'){
                        this.blocked.left = true;
                        this.playerSprite.stateMachine.transition('sliding')
                    }
                }
                else if((bodyA.label === 'right' || bodyA.label === 'left' || bodyA.label === 'bottom' || bodyA.label === 'player') && bodyB.label === 'traps' || bodyA.label === 'traps' && (bodyB.label === 'player' || bodyB.label === 'right' || bodyB.label === 'left' || bodyB.label === 'bottom')) {
                    if(this.playerSprite.stateMachine.state != 'hook'){
                        this.scene.reset();
                        this.scene.scene.pause()
                        this.scene.scene.launch('GameOver')
                    }
                }
            }
        }, this);

        this.scene.matter.world.on('collisionend', function (event) {
            for (let i = 0; i < event.pairs.length; i++) {
                const bodyA = event.pairs[i].bodyA;
                const bodyB = event.pairs[i].bodyB;

                if (bodyA.label === 'bottom' && bodyB.label === 'platform' || bodyA.label === 'platform' && bodyB.label === 'bottom') {
                    if (this.blocked.left || this.blocked.right) {
                        this.playerSprite.stateMachine.transition('sliding');
                    }
                }

                if (bodyA.label === 'right' && bodyB.label === 'platform' || bodyA.label === 'platform' && bodyB.label === 'right') {
                        this.blocked.right = false;
                        this.playerSprite.stateMachine.transition('falling');
                } else if (bodyA.label === 'left' && bodyB.label === 'platform' || bodyA.label === 'platform' && bodyB.label === 'left') {
                        this.blocked.left = false;
                        this.playerSprite.stateMachine.transition('falling');
                }
            }
        }, this);

        this.scene.matter.world.on('collisionstart', function (event) {
            for (let i = 0; i < event.pairs.length; i++)
            {
                const bodyA = event.pairs[i].bodyA;
                const bodyB = event.pairs[i].bodyB;

                if(bodyA.label === 'right' && bodyB.label === 'End' || bodyA.label === 'End' && bodyB.label === 'right') {
                    this.scene.clearLevel();
                    this.scene.LevelRecordings.shift();
                    this.playerSprite.hook.DeleteHook();
                    this.playerSprite.setVelocity(0, 0);
                    this.playerSprite.setPosition(200, 3400)
                    this.scene.swapLevel(this.scene.levels.shift());
                }

                if((bodyA.label === 'right' || bodyA.label === 'left' || bodyA.label === 'bottom') && bodyB.label === 'Ending' || bodyA.label === 'Ending' && (bodyB.label === 'right' || bodyB.label === 'left' || bodyB.label === 'bottom')) {
                    this.scene.scene.pause()
                    this.scene.scene.launch('Win')
                }

                if(bodyA.label === 'StartingRec' && bodyB.label === 'right' || bodyA.label === 'right' && bodyB.label === 'StartingRec') {
                    this.scene.startRecording();
                }
                if(bodyA.label === 'EndingRec' && (bodyB.label === 'right' || bodyB.label === 'left' || bodyB.label === 'bottom') || (bodyA.label === 'right' || bodyA.label === 'left' || bodyA.label === 'bottom') && bodyB.label === 'EndingRec') {
                    this.scene.stopRecording();
                    this.scene.recorder.dumpRecordings();
                }
                if(bodyA.label === 'still' && bodyB.label === 'right' || bodyA.label === 'right' && bodyB.label === 'still') {
                    this.scene.stopRecording();
                    this.scene.startRecording();
                    
                    if (bodyA.label === 'still') {
                        console.log(bodyA)
                        this.scene.matter.world.remove(bodyA);
                    } else {
                        console.log(bodyB)
                        this.scene.matter.world.remove(bodyB);
                    }
                }
            }
        }, this);

        this.playerSprite.hook.CreateHookBinds();
    }

    Update() {
        
    }
}








