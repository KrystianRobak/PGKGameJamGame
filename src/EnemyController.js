import EnemySprite from "./sprites/EnemySprite";

import enemyLevel1Recording1 from '../levels/1/level1enemy1.json'
import enemyLevel1Recording2 from '../levels/1/level1enemy2.json'

const Sides = {
    right: 1,
    left: -1
}

const Level1Recordings = [
    enemyLevel1Recording1,
    enemyLevel1Recording2
]

export default class EnemyController {
    constructor(scene, amount) {
        this.scene = scene;
        this.enemiesAmount = amount;
        this.recordings = Level1Recordings;
        console.log(this.recordings)

        this.enemies = []

        this.populateEnemies();
    }

    populateEnemies() {
        for(var i = 0;i < this.enemiesAmount; i++) {
            var enemySprite = new EnemySprite(
                this.scene,
                0,
                this.scene.game.scale.gameSize.height / 2,
                this,
                Level1Recordings[i],
                'enemy');

            enemySprite.label = 'enemy';
            enemySprite.setFixedRotation();
            enemySprite.setIgnoreGravity(true);

            this.scene.add.existing(enemySprite);
            this.enemies.push(enemySprite);
        }
    }

    UpdateEnemies(number) {
        for(var i = 0;i < this.enemiesAmount; i++) {
            if(number == 10) {
                if(this.enemies[i].recordingNum < this.enemies[i].recording.length){
                    this.enemies[i].prevNums = this.enemies[i].currNums;
                    this.enemies[i].currNums = this.enemies[i].recording[this.enemies[i].recordingNum]
                }
                this.enemies[i].setPosition(parseFloat(this.enemies[i].prevNums[0]),parseFloat(this.enemies[i].prevNums[1]))
                this.enemies[i].recordingNum += 1;
            } else {
                var steps = 10;

                var interpolationFactor = number / steps;
                var lerpedX = parseFloat(this.enemies[i].prevNums[0]) + (parseFloat(this.enemies[i].currNums[0]) - parseFloat(this.enemies[i].prevNums[0])) * interpolationFactor;
                var lerpedY = parseFloat(this.enemies[i].prevNums[1]) + (parseFloat(this.enemies[i].currNums[1]) - parseFloat(this.enemies[i].prevNums[1])) * interpolationFactor;
                lerpedX.toFixed(2);
                lerpedY.toFixed(2);
                this.enemies[i].setPosition(lerpedX, lerpedY);
            }
            if (!this.enemies[i].hooked && this.enemies[i].currNums[5]) {
                var pointerEne = {
                    worldX: this.enemies[i].currNums[6][0],
                    worldY: this.enemies[i].currNums[6][1]
                };
                this.enemies[i].hook.ShootHook(pointerEne);
                this.enemies[i].hooked = true;
            } else if (this.enemies[i].hooked && !this.enemies[i].currNums[5]) {
                this.enemies[i].hook.DeleteHook();
                this.enemies[i].hooked = false;
            }
            if(lerpedY < this.enemies[i].currNums[1]){
                this.enemies[i].anims.play('jumping')
            }
            if(this.enemies[i].currNums[2]){
                this.enemies[i].anims.play('run')
                this.enemies[i].setFlipX(true);
            }
            if(this.enemies[i].currNums[3]){
                this.enemies[i].anims.play('run')
                this.enemies[i].setFlipX(false);
            }
        }
    }
}