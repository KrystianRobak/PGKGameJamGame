import State from "./state";

export default class FallingState extends State {
    enter(keys, player) {
        
    }

    execute(keys, player) {
        super.execute(keys, player);
        if (player.body.velocity.x < 0)
            player.DecVelocityX(0.03);
        else
            player.DecVelocityX(-0.03);
    }
}
