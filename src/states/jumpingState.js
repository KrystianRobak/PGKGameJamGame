import State from "./state";

export default class JumpingState extends State {
    enter(scene, player) {
        this.player = player;
        player.anims.stop()
        //player.anims.play("jumping")
        console.log(player.body.velocity)
        this.hitHook = false;
    }

    execute(scene, player) {
        if(player.label != 'enemy') {
            if (scene.cursors.left.isDown) {
                player.IncVelocityX(-1);
                player.setFlipX(true);
            } else if (scene.cursors.right.isDown) {
                player.IncVelocityX(1);
                player.setFlipX(false);
            }
        }
        if(player.body.velocity.y >= 0){
            player.setVelocityY(0);
            //player.stateMachine.transition('falling')
        }
        if (player.body.velocity.x < 0)
            player.DecVelocityX(0.03);
        else
            player.DecVelocityX(-0.03);
    }
}
