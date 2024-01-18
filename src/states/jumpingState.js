import State from "./state";

export default class JumpingState extends State {
    enter(scene, player, jumpAmount) {
        player.anims.stop();
        this.jumpAmount = jumpAmount;
        this.currJump = 1;
        this.hitHook = false;
        scene.matter.world.on("collisionstart", this.handleCollision, this);
    }

    handleCollision(event, bodyA, bodyB) {
        if (!this.hitHook && ((bodyA.label == "laser" && bodyB.label == "platform") || (bodyB.label == "laser" && bodyA.label == "platform"))) {
            player.stateMachine.transition('idle');
            this.hitHook = true;
        }
    }

    execute(scene, player) {
        if (scene.cursors.left.isDown) {
            player.IncVelocityX(-0.2);
            player.setFlipX(true);
            player.anims.play('run', true);
        } else if (scene.cursors.right.isDown) {
            player.IncVelocityX(0.2);
            player.setFlipX(false);
            player.anims.play('run', true);
        }

        if (scene.cursors.up.isDown && this.currJump < this.jumpAmount) {
            player.setVelocityY(-10);
            this.currJump += 1;
        } else if (player.body.velocity.y >= 0) {
            // Transition to 'idle' state when the jump is completed
            player.stateMachine.transition('idle');
        }

        // Deceleration when not moving left or right
        if (player.body.velocity.x < 0)
            player.DecVelocityX(0.03);
        else
            player.DecVelocityX(-0.03);

        player.anims.play('idle', true);
    }
}
