import PlayerSprite from "./sprites/PlayerSprite";

export default class PlayerController {
    constructor(scene) {
        this.scene = scene;
        this.playerSprite = new PlayerSprite(this.scene,0,this.scene.game.scale.gameSize.height *0.2, this, 'player');

        scene.add.existing(this.playerSprite);

        this.blocked = {
            left: false,
            right: false,
            bottom: false
        };
        const sx = this.playerSprite.width / 2;
        const sy = this.playerSprite.height / 2;

        const playerBody = Phaser.Physics.Matter.Matter.Bodies.rectangle(sx, sy, this.playerSprite.width, this.playerSprite.height);

        this.sensors = {
            bottom: Phaser.Physics.Matter.Matter.Bodies.rectangle(sx, this.playerSprite.height, sx, 10, { isSensor: true , label: 'bottom'}),
            left: Phaser.Physics.Matter.Matter.Bodies.rectangle(sx - this.playerSprite.width * 0.50, sy, 5, this.playerSprite.height * 0.25, { isSensor: true, label: 'left' }),
            right: Phaser.Physics.Matter.Matter.Bodies.rectangle(sx + this.playerSprite.width * 0.50, sy, 5, this.playerSprite.height * 0.25, { isSensor: true, label: 'right' })
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


        this.createColliders();
    }

    createColliders() {
        this.scene.matter.world.on('collisionactive', function (event) {
            for (let i = 0; i < event.pairs.length; i++)
            {
                const bodyA = event.pairs[i].bodyA;
                const bodyB = event.pairs[i].bodyB;

                if(bodyA.label === 'bottom' && bodyB.label === 'platform' || bodyA.label === 'platform' && bodyB.label === 'bottom') {
                    if(this.playerSprite.stateMachine.step == 'hook')
                        continue;
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
            }
        }, this);

        this.scene.matterCollision.addOnCollideStart({
            objectA: this.playerSprite,
            objectB: this.scene.dangerous,
            callback: () => {
                this.playerSprite.setPosition(0, 400);
            },
            context: this
        });

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
                } else if (bodyA.label === 'left' && bodyB.label === 'platform' || bodyA.label === 'platform' && bodyB.label === 'left') {
                        this.blocked.left = false;
                }
            }
        }, this);


        this.playerSprite.hook.CreateHookBinds();
    }

}








