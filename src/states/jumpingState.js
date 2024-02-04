import State from "./state";

export default class JumpingState extends State {
    enter(keys, player) {
        this.player = player;
        player.anims.stop()
        player.anims.play("jumping")

        this.hitHook = false;
    }

    execute(keys, player) {
        super.execute(keys, player);
        if(player.body.velocity.y >= 0){
            player.setVelocityY(0);
            player.stateMachine.transition('falling')
        }
        if (player.body.velocity.x < 0)
            player.DecVelocityX(0.03);
        else
            player.DecVelocityX(-0.03);
    }
}
