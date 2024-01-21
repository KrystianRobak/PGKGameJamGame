import State from "./state"; 

export default class IdleRunningState extends State {
    enter(scene, player) {
        player.anims.stop();
    }
    
    execute(scene, player) {
        if (scene.cursors.left.isDown)
        {
            player.IncVelocityX(-1);
            player.setFlipX(true);
            player.anims.play('run', true);
        }
        else if (scene.cursors.right.isDown)
        {
            player.IncVelocityX(1);
            player.setFlipX(false);
            player.anims.play('run', true);
        }
        if (scene.cursors.up.isDown) {
            player.IncVelocityY(-10);
            player.stateMachine.transition('jump');
            return;
        }
        else
        {
            if(player.body.velocity.x < 0)
                player.DecVelocityX(0.05);
            else
                player.DecVelocityX(-0.05);
            player.anims.play('idle', true);
        }
   }  

    
}