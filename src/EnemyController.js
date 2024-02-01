import PlayerSprite from "./sprites/PlayerSprite";
import HookWaypoint from "./waypoints/hookWaypoint";
import JumpWaypoint from './waypoints/jumpWaypoint';

export default class EnemyController {
    constructor(scene, amount) {
        this.scene = scene;
        this.enemiesAmount = amount;

        this.waypoints = [
            new JumpWaypoint(this.scene, 500, 650),
            new HookWaypoint(this.scene, 800, 650, 200, 200),
            new JumpWaypoint(this.scene, 800, 400),
        ]

        this.enemiesProgress = [];

        this.enemiesReactionSpeed = [];
        this.enemiesMovementSpeed = [];

        this.populateEnemies();
        this.createColliders();
    }

    populateEnemies() {
        for(var i = 0;i < this.enemiesAmount; i++) {
            var enemySprite = new PlayerSprite(this.scene,0,this.scene.game.scale.gameSize.height / 2, this, 'enemy');
            enemySprite.label = 'enemy';
            enemySprite.setFixedRotation();
            this.scene.add.existing(enemySprite);
            this.enemiesProgress.push([enemySprite, this.waypoints[0]]);
        }
    }

    createColliders() {
        this.scene.matter.world.on('collisionstart', function (event) {
            for (let i = 0; i < event.pairs.length; i++)
            {
                const bodyA = event.pairs[i].bodyA;
                const bodyB = event.pairs[i].bodyB;
                if ((bodyA.label === 'enemy' && bodyB.label === 'traps') || (bodyA.label === 'traps' && bodyB.label === 'enemy')) {
                    const enemyIndex = this.enemiesProgress.findIndex((enemyProgress) => enemyProgress[0].body === bodyA || enemyProgress[0].body === bodyB);
                    if (enemyIndex !== -1) {
                        const [enemySprite] = this.enemiesProgress.splice(enemyIndex, 1);
                        enemySprite[0].destroy();
                    }
                }
                if(bodyA.label === 'enemy' && bodyB.label === 'Waypoint' || bodyA.label === 'Waypoint' && bodyB.label === 'enemy') {
                    if(bodyA.label === 'enemy') {
                        bodyB.gameObject.onEntered(bodyB.gameObject);
                    }
                    if(bodyB.label === 'enemy') {
                        bodyA.gameObject.onEntered(bodyB.gameObject);
                    }
                    const waypointBody = bodyA.label === 'Waypoint' ? bodyA : bodyB;
                    console.log(waypointBody)
                    const waypointIndex = this.waypoints.indexOf(waypointBody.gameObject);
                    if (waypointIndex !== -1) {
                        this.waypoints.splice(waypointIndex, 1);
                        waypointBody.destroy();
                    }
                }
            }
        }, this);
    }

    UpdateEnemies() {
        for (let i = 0; i < this.enemiesProgress.length; i++) {
            var enemyProgress = this.enemiesProgress[i];   
            var enemySprite = enemyProgress[0];
            enemySprite.stateMachine.step();
            var currentWaypoint = enemyProgress[1];

            // Calculate the direction towards the current waypoint
            const directionX = currentWaypoint.x - enemySprite.x;
            const directionY = currentWaypoint.y - enemySprite.y;
            const distance = Math.sqrt(directionX * directionX + directionY * directionY);

            // Normalize the direction
            const normalizedDirectionX = directionX / distance;

            // Move the enemy towards the current waypoint
            const speed = 0.2; // Adjust the speed as needed
            enemySprite.IncVelocityX(speed * normalizedDirectionX);

            // Check if the enemy has reached the current waypoint
            const distanceToWaypoint = Phaser.Math.Distance.Between(
                enemySprite.x, enemySprite.y,
                currentWaypoint.x, currentWaypoint.y
            );

            if (distanceToWaypoint < 120) { // Adjust the threshold as needed
                // Move to the next waypoint
                const nextWaypointIndex = (this.waypoints.indexOf(currentWaypoint) + 1) % this.waypoints.length;
                enemyProgress[1] = this.waypoints[nextWaypointIndex];
                
            }
        }
    }
}