import State from "./state"; 

export default class IdleRunningState extends State {
    enter(keys, player) {
        player.anims.stop();
    }
    
    execute(keys, player) {
        super.execute(keys, player);
            if (keys.keyW.isDown) {
                if(player.jumpFlip) {
                player.setVelocityY(-10);
                player.stateMachine.transition('jump');
                player.jumpFlip = false;
                }
            }
            if(keys.keyW.isUp) {
                player.jumpFlip = true;
            }
            if(player.body.velocity.x < 0)
                player.DecVelocityX(0.05);
            else
                player.DecVelocityX(-0.05);
            player.anims.play('idle', true);
   }  

    
}