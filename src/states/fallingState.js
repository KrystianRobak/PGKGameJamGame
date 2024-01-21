import State from "./state";

export default class FallingState extends State {
    enter(scene, player) {
        player.anims.stop()
    }

    execute(scene, player) {
        if (scene.cursors.left.isDown) {
            player.IncVelocityX(-1);
            player.setFlipX(true);
            player.anims.play('falling', true);
        } else if (scene.cursors.right.isDown) {
            player.IncVelocityX(1);
            player.setFlipX(false);
            player.anims.play('falling', true);
        }
        if (player.body.velocity.x < 0)
            player.DecVelocityX(0.03);
        else
            player.DecVelocityX(-0.03);
    }
}
